async function sendToIA() {
    const input = document.getElementById("pagina-caderno").textContent.trim();
    const box = document.getElementById("pagina-caderno"); // or create a response element

    if (!input) {
        alert("Escreva algum texto para continuar!");
        return;
    }

    // Perhaps show loading
    box.innerHTML += "<br><br>Continuando o texto com IA...";

    try {
        const response = await fetch("/api/continue-text", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: input })
        });

        const data = await response.json();

        if (!response.ok) {
            box.innerHTML += "<br>Erro: " + (data.error || "Erro desconhecido");
            return;
        }

        box.innerHTML += "<br><br>" + data.continuation;

    } catch (error) {
        console.error(error);
        box.innerHTML += "<br>Erro ao conectar ao servidor.";
    }
}

// Add event listener
document.getElementById("analisar-ia-btn").addEventListener("click", sendToIA);

// Notebook management
let cadernos = JSON.parse(localStorage.getItem('cadernos')) || {};
let cadernoAtual = localStorage.getItem('cadernoAtual') || 'Caderno Principal';
let paginaAtual = parseInt(localStorage.getItem('paginaAtual')) || 0;

// Ensure all notebooks have 20 pages
Object.keys(cadernos).forEach(nome => {
    if (cadernos[nome].length < 20) {
        cadernos[nome] = cadernos[nome].concat(Array(20 - cadernos[nome].length).fill(''));
    }
});

// Initialize
if (!cadernos[cadernoAtual]) {
    cadernos[cadernoAtual] = Array(20).fill('');
    salvarCadernos();
}

atualizarSelector();
carregarCaderno();

function salvarPaginaAtual() {
    cadernos[cadernoAtual][paginaAtual] = document.getElementById('pagina-caderno').innerHTML;
    salvarCadernos();
}

function atualizarPaginaInfo() {
    document.getElementById('pagina-info').textContent = `Página ${paginaAtual + 1} de ${cadernos[cadernoAtual].length}`;
    document.getElementById('pagina-anterior').disabled = paginaAtual === 0;
    document.getElementById('pagina-proxima').disabled = paginaAtual === cadernos[cadernoAtual].length - 1;
}

function carregarCaderno() {
    const pagina = cadernos[cadernoAtual][paginaAtual] || '';
    document.getElementById('pagina-caderno').innerHTML = pagina;
    document.getElementById('campo-data').value = localStorage.getItem('data-' + cadernoAtual + '-' + paginaAtual) || '';
    document.getElementById('campo-materia').value = localStorage.getItem('materia-' + cadernoAtual + '-' + paginaAtual) || '';
    document.getElementById('campo-professor').value = localStorage.getItem('professor-' + cadernoAtual + '-' + paginaAtual) || '';
    document.getElementById('campo-turno').value = localStorage.getItem('turno-' + cadernoAtual + '-' + paginaAtual) || '';
    // Apply saved color
    const corSalva = localStorage.getItem('corCaneta') || 'black';
    document.getElementById('pagina-caderno').style.color = corSalva;
    atualizarPaginaInfo();
}

function atualizarSelector() {
    const selector = document.getElementById('caderno-selector-toolbar');
    console.log('Atualizando selector, elemento encontrado:', selector);
    selector.innerHTML = '';
    const nomes = Object.keys(cadernos);
    console.log('Nomes dos cadernos:', nomes);
    nomes.forEach(nome => {
        const option = document.createElement('option');
        option.value = nome;
        option.textContent = nome;
        if (nome === cadernoAtual) option.selected = true;
        selector.appendChild(option);
        console.log('Opção adicionada:', nome);
    });
    console.log('Selector atualizado, opções:', selector.options.length);
}

function salvarCadernos() {
    localStorage.setItem('cadernos', JSON.stringify(cadernos));
    localStorage.setItem('cadernoAtual', cadernoAtual);
    localStorage.setItem('paginaAtual', paginaAtual);
}

// Auto-save
let autoSaveTimer;
document.getElementById('pagina-caderno').addEventListener('input', () => {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
        cadernos[cadernoAtual][paginaAtual] = document.getElementById('pagina-caderno').innerHTML;
        salvarCadernos();
    }, 1000);
});

document.getElementById('campo-data').addEventListener('input', () => {
    localStorage.setItem('data-' + cadernoAtual + '-' + paginaAtual, document.getElementById('campo-data').value);
});

document.getElementById('campo-materia').addEventListener('input', () => {
    localStorage.setItem('materia-' + cadernoAtual + '-' + paginaAtual, document.getElementById('campo-materia').value);
});

document.getElementById('campo-professor').addEventListener('input', () => {
    localStorage.setItem('professor-' + cadernoAtual + '-' + paginaAtual, document.getElementById('campo-professor').value);
});

document.getElementById('campo-turno').addEventListener('change', () => {
    localStorage.setItem('turno-' + cadernoAtual + '-' + paginaAtual, document.getElementById('campo-turno').value);
});

// Toolbar events
document.getElementById('caderno-selector-toolbar').addEventListener('change', (e) => {
    console.log('Caderno selecionado:', e.target.value);
    salvarPaginaAtual();
    cadernoAtual = e.target.value;
    paginaAtual = 0;
    salvarCadernos();
    carregarCaderno();
});

document.getElementById('novo-caderno-btn-toolbar').addEventListener('click', () => {
    console.log('Novo caderno clicado');
    salvarPaginaAtual();
    const nome = prompt('Nome do novo caderno:');
    if (nome && !cadernos[nome]) {
        cadernos[nome] = Array(20).fill('');
        cadernoAtual = nome;
        paginaAtual = 0;
        salvarCadernos();
        atualizarSelector();
        carregarCaderno();
    }
});

document.getElementById('renomear-caderno-btn-toolbar').addEventListener('click', () => {
    console.log('Renomear caderno clicado');
    salvarPaginaAtual();
    const novoNome = prompt('Novo nome para o caderno:', cadernoAtual);
    if (novoNome && novoNome !== cadernoAtual && !cadernos[novoNome]) {
        // Rename the notebook
        cadernos[novoNome] = cadernos[cadernoAtual];
        delete cadernos[cadernoAtual];
        
        // Rename localStorage keys for data, materia, professor and turno
        for (let i = 0; i < 20; i++) {
            const oldDataKey = 'data-' + cadernoAtual + '-' + i;
            const oldMateriaKey = 'materia-' + cadernoAtual + '-' + i;
            const oldProfessorKey = 'professor-' + cadernoAtual + '-' + i;
            const oldTurnoKey = 'turno-' + cadernoAtual + '-' + i;
            const newDataKey = 'data-' + novoNome + '-' + i;
            const newMateriaKey = 'materia-' + novoNome + '-' + i;
            const newProfessorKey = 'professor-' + novoNome + '-' + i;
            const newTurnoKey = 'turno-' + novoNome + '-' + i;
            
            const dataValue = localStorage.getItem(oldDataKey);
            const materiaValue = localStorage.getItem(oldMateriaKey);
            const professorValue = localStorage.getItem(oldProfessorKey);
            const turnoValue = localStorage.getItem(oldTurnoKey);
            
            if (dataValue !== null) {
                localStorage.setItem(newDataKey, dataValue);
                localStorage.removeItem(oldDataKey);
            }
            if (materiaValue !== null) {
                localStorage.setItem(newMateriaKey, materiaValue);
                localStorage.removeItem(oldMateriaKey);
            }
            if (professorValue !== null) {
                localStorage.setItem(newProfessorKey, professorValue);
                localStorage.removeItem(oldProfessorKey);
            }
            if (turnoValue !== null) {
                localStorage.setItem(newTurnoKey, turnoValue);
                localStorage.removeItem(oldTurnoKey);
            }
        }
        
        cadernoAtual = novoNome;
        salvarCadernos();
        atualizarSelector();
        carregarCaderno();
    } else if (novoNome === cadernoAtual) {
        alert('O nome é o mesmo.');
    } else if (cadernos[novoNome]) {
        alert('Já existe um caderno com esse nome.');
    }
});

// Font selector
document.getElementById('font-selector-toolbar').addEventListener('change', (e) => {
    console.log('Fonte mudada para:', e.target.value);
    const pagina = document.getElementById('pagina-caderno');
    pagina.className = 'font-' + e.target.value + ' page';
    pagina.style.color = localStorage.getItem('corCaneta') || 'black';
    localStorage.setItem('fonte', e.target.value);
});

// Load font
const fonteSalva = localStorage.getItem('fonte') || 'font-kalam';
document.getElementById('font-selector-toolbar').value = fonteSalva;
document.getElementById('pagina-caderno').classList.add('font-' + fonteSalva);

// Color selector
document.getElementById('color-selector-toolbar').addEventListener('change', (e) => {
    console.log('Cor mudada para:', e.target.value);
    document.getElementById('pagina-caderno').style.color = e.target.value;
    localStorage.setItem('corCaneta', e.target.value);
});

// Load color
const corSalva = localStorage.getItem('corCaneta') || 'black';
document.getElementById('color-selector-toolbar').value = corSalva;
document.getElementById('pagina-caderno').style.color = corSalva;

// Page navigation
document.getElementById('pagina-anterior').addEventListener('click', () => {
    salvarPaginaAtual();
    if (paginaAtual > 0) {
        paginaAtual--;
        salvarCadernos();
        carregarCaderno();
    }
});

document.getElementById('pagina-proxima').addEventListener('click', () => {
    salvarPaginaAtual();
    if (paginaAtual < cadernos[cadernoAtual].length - 1) {
        paginaAtual++;
        salvarCadernos();
        carregarCaderno();
    }
});

// Toggle sidebar (hidden now)
document.getElementById('toggle-sidebar').style.display = 'none';

// PDF export
document.getElementById('exportar-pdf-btn').addEventListener('click', () => {
    const element = document.querySelector('.book-container');
    html2pdf().set({
        margin: 1,
        filename: cadernoAtual + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).from(element).save();
});

// WhatsApp share
document.getElementById('whatsapp-btn').addEventListener('click', () => {
    document.getElementById('modal-whatsapp').classList.add('active');
});

document.getElementById('whatsapp-cancelar').addEventListener('click', () => {
    document.getElementById('modal-whatsapp').classList.remove('active');
});

document.getElementById('whatsapp-enviar').addEventListener('click', () => {
    const resumo = document.getElementById('whatsapp-resumo').value;
    const ddd = document.getElementById('whatsapp-ddd').value;
    const numero = document.getElementById('whatsapp-numero').value;
    if (ddd && numero) {
        const texto = encodeURIComponent(resumo + '\n\n' + document.getElementById('pagina-caderno').textContent);
        const url = `https://wa.me/55${ddd}${numero}?text=${texto}`;
        window.open(url, '_blank');
        document.getElementById('modal-whatsapp').classList.remove('active');
    }
});

// Função para aplicar/remover destaque ao texto selecionado (toggle)
function applyHighlight(colorClass) {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;
    
    const range = selection.getRangeAt(0);
    if (range.collapsed) return; // Nada selecionado
    
    // Verificar se o texto selecionado já está destacado com essa cor
    const selectedText = range.toString();
    const container = range.commonAncestorContainer;
    const parentElement = container.nodeType === Node.TEXT_NODE ? container.parentElement : container;
    
    // Verificar se o pai ou algum ancestral tem a classe de highlight
    let highlightElement = null;
    let currentElement = parentElement;
    while (currentElement && currentElement !== document.getElementById('pagina-caderno')) {
        if (currentElement.classList && currentElement.classList.contains(colorClass)) {
            highlightElement = currentElement;
            break;
        }
        currentElement = currentElement.parentElement;
    }
    
    if (highlightElement) {
        // Remover o destaque: extrair o conteúdo e substituir
        const parent = highlightElement.parentElement;
        while (highlightElement.firstChild) {
            parent.insertBefore(highlightElement.firstChild, highlightElement);
        }
        parent.removeChild(highlightElement);
    } else {
        // Aplicar o destaque
        const span = document.createElement('span');
        span.className = colorClass;
        
        try {
            // Tentar envolver o conteúdo selecionado
            range.surroundContents(span);
        } catch (e) {
            // Se surroundContents falhar (ex: range cruza elementos), usar abordagem alternativa
            const contents = range.extractContents();
            span.appendChild(contents);
            range.insertNode(span);
        }
    }
    
    // Limpar a seleção
    selection.removeAllRanges();
}

// Event listeners para os botões de destaque
document.getElementById('highlight-yellow').addEventListener('click', () => {
    applyHighlight('highlight-yellow');
});

document.getElementById('highlight-blue').addEventListener('click', () => {
    applyHighlight('highlight-blue');
});

document.getElementById('highlight-green').addEventListener('click', () => {
    applyHighlight('highlight-green');
});

// Voice dictation (basic)