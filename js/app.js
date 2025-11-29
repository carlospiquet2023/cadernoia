/**
 * CADERNO DIGITAL COM IA - v2.0
 * Desenvolvido por: Carlos Antonio de Oliveira Piquet
 */

// TOAST
const Toast = {
    container: null,
    init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    },
    show(message, type = 'info', duration = 4000) {
        this.init();
        const icons = {
            success: `<svg class="toast-icon" fill="none" stroke="#10b981" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
            error: `<svg class="toast-icon" fill="none" stroke="#f43f5e" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
            warning: `<svg class="toast-icon" fill="none" stroke="#f59e0b" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`,
            info: `<svg class="toast-icon" fill="none" stroke="#06b6d4" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
        };
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `${icons[type]}<span class="toast-message">${message}</span><button class="toast-close"><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`;
        toast.querySelector('.toast-close').onclick = () => this.dismiss(toast);
        this.container.appendChild(toast);
        if (duration > 0) setTimeout(() => this.dismiss(toast), duration);
        return toast;
    },
    dismiss(toast) { toast.classList.add('toast-out'); setTimeout(() => toast.remove(), 300); },
    success(msg) { return this.show(msg, 'success'); },
    error(msg) { return this.show(msg, 'error'); },
    warning(msg) { return this.show(msg, 'warning'); },
    info(msg) { return this.show(msg, 'info'); }
};

// TEMA
const Theme = {
    current: localStorage.getItem('theme') || 'light',
    init() { this.apply(this.current); this.createToggle(); },
    apply(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.current = theme;
        localStorage.setItem('theme', theme);
        const toggle = document.getElementById('theme-toggle');
        if (toggle) toggle.setAttribute('aria-checked', theme === 'dark');
    },
    toggle() {
        const newTheme = this.current === 'light' ? 'dark' : 'light';
        this.apply(newTheme);
        Toast.info(`Tema ${newTheme === 'dark' ? 'escuro' : 'claro'} ativado`);
    },
    createToggle() {
        if (document.getElementById('theme-toggle')) return;
        const toolbarHeader = document.querySelector('.toolbar-header');
        if (!toolbarHeader) return;
        const div = document.createElement('div');
        div.className = 'theme-toggle';
        div.innerHTML = `<svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path></svg><button id="theme-toggle" class="theme-switch" role="switch" aria-checked="${this.current === 'dark'}"></button><svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>`;
        toolbarHeader.appendChild(div);
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggle());
    }
};

// STATS
const Stats = {
    update() {
        const pagina = document.getElementById('pagina-caderno');
        if (!pagina) return;
        const texto = pagina.textContent || '';
        const palavras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
        const caracteres = texto.length;
        const maxChars = Cadernos?.MAX_CHARS_PER_PAGE || 4060;
        const restantes = Math.max(0, maxChars - caracteres);
        const wordCount = document.getElementById('stat-words');
        const charCount = document.getElementById('stat-chars');
        const remainingCount = document.getElementById('stat-remaining');
        if (wordCount) wordCount.textContent = palavras;
        if (charCount) charCount.textContent = caracteres;
        if (remainingCount) {
            remainingCount.textContent = restantes;
            remainingCount.style.color = restantes < 500 ? '#ef4444' : restantes < 1000 ? '#f59e0b' : '';
        }
    },
    createDisplay() {
        const toolbarHeader = document.querySelector('.toolbar-header');
        if (!toolbarHeader || document.getElementById('toolbar-stats')) return;
        const stats = document.createElement('div');
        stats.id = 'toolbar-stats';
        stats.className = 'toolbar-stats';
        stats.innerHTML = `<div class="stat-item"><span id="stat-words" class="stat-value">0</span><span class="stat-label">Palavras</span></div><div class="stat-item"><span id="stat-chars" class="stat-value">0</span><span class="stat-label">Caracteres</span></div><div class="stat-item"><span id="stat-remaining" class="stat-value">4060</span><span class="stat-label">Restantes</span></div>`;
        toolbarHeader.appendChild(stats);
        this.update();
    }
};

// CADERNOS
const Cadernos = {
    data: {},
    atual: 'Caderno Principal',
    paginaAtual: 0,
    maxPaginas: 20,
    MAX_CHARS_PER_PAGE: 4060,

    init() {
        this.data = JSON.parse(localStorage.getItem('cadernos')) || {};
        this.atual = localStorage.getItem('cadernoAtual') || 'Caderno Principal';
        this.paginaAtual = parseInt(localStorage.getItem('paginaAtual')) || 0;
        Object.keys(this.data).forEach(nome => {
            if (this.data[nome].length < this.maxPaginas) {
                this.data[nome] = this.data[nome].concat(Array(this.maxPaginas - this.data[nome].length).fill(''));
            }
        });
        if (!this.data[this.atual]) {
            this.data[this.atual] = Array(this.maxPaginas).fill('');
            this.salvar();
        }
        this.atualizarSelector();
        this.carregar();
    },

    salvar() {
        localStorage.setItem('cadernos', JSON.stringify(this.data));
        localStorage.setItem('cadernoAtual', this.atual);
        localStorage.setItem('paginaAtual', this.paginaAtual);
    },

    salvarPaginaAtual() {
        const pagina = document.getElementById('pagina-caderno');
        if (pagina && this.data[this.atual]) {
            this.data[this.atual][this.paginaAtual] = pagina.innerHTML;
            this.salvar();
        }
    },

    posicionarCursorFinal() {
        const pagina = document.getElementById('pagina-caderno');
        if (!pagina) return;
        pagina.focus();
        const range = document.createRange();
        range.selectNodeContents(pagina);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    },

    verificarLimiteCaracteres() {
        const pagina = document.getElementById('pagina-caderno');
        if (!pagina) return;
        const textoAtual = pagina.textContent || '';
        if (textoAtual.length > this.MAX_CHARS_PER_PAGE) {
            let pontoCorte = this.MAX_CHARS_PER_PAGE;
            for (let i = pontoCorte; i > pontoCorte - 200 && i > 0; i--) {
                if (textoAtual[i] === ' ' || textoAtual[i] === '\n') { pontoCorte = i; break; }
            }
            const textoManter = textoAtual.substring(0, pontoCorte).trim();
            const textoMover = textoAtual.substring(pontoCorte).trim();
            if (textoMover.length > 0 && this.paginaAtual < this.maxPaginas - 1) {
                pagina.textContent = textoManter;
                this.data[this.atual][this.paginaAtual] = textoManter;
                const proximaPag = this.paginaAtual + 1;
                const conteudoProxima = this.data[this.atual][proximaPag] || '';
                this.data[this.atual][proximaPag] = textoMover + (conteudoProxima ? '\n\n' + conteudoProxima : '');
                this.salvar();
                Toast.info(`📄 Pulando para página ${proximaPag + 1}...`);
                setTimeout(() => {
                    this.paginaAtual = proximaPag;
                    this.carregar();
                    Stats.update();
                    this.posicionarCursorFinal();
                }, 150);
            } else if (this.paginaAtual >= this.maxPaginas - 1) {
                Toast.warning('Limite de 20 páginas atingido!');
                pagina.textContent = textoManter;
            }
        }
    },

    carregar() {
        const pagina = document.getElementById('pagina-caderno');
        if (!pagina || !this.data[this.atual]) return;
        pagina.innerHTML = this.data[this.atual][this.paginaAtual] || '';
        
        // Carregar campos do cabeçalho
        ['data', 'materia', 'professor', 'turno'].forEach(campo => {
            const el = document.getElementById(`campo-${campo}`);
            if (el) {
                // Buscar valor da página atual
                let valor = localStorage.getItem(`${campo}-${this.atual}-${this.paginaAtual}`) || '';
                
                // Se não tiver valor e não for a primeira página, herdar da página anterior
                if (!valor && this.paginaAtual > 0) {
                    valor = localStorage.getItem(`${campo}-${this.atual}-${this.paginaAtual - 1}`) || '';
                    // Salvar o valor herdado para esta página
                    if (valor) {
                        localStorage.setItem(`${campo}-${this.atual}-${this.paginaAtual}`, valor);
                    }
                }
                
                el.value = valor;
            }
        });
        
        pagina.style.color = localStorage.getItem('corCaneta') || 'black';
        this.atualizarPaginaInfo();
        Stats.update();
    },

    atualizarPaginaInfo() {
        const info = document.getElementById('pagina-info');
        if (info) info.textContent = `Página ${this.paginaAtual + 1} de ${this.maxPaginas}`;
        const btnAnt = document.getElementById('pagina-anterior');
        const btnProx = document.getElementById('pagina-proxima');
        if (btnAnt) btnAnt.disabled = this.paginaAtual === 0;
        if (btnProx) btnProx.disabled = this.paginaAtual >= this.maxPaginas - 1;
    },

    atualizarSelector() {
        const selector = document.getElementById('caderno-selector-toolbar');
        if (!selector) return;
        selector.innerHTML = '';
        Object.keys(this.data).forEach(nome => {
            const opt = document.createElement('option');
            opt.value = nome;
            opt.textContent = nome;
            if (nome === this.atual) opt.selected = true;
            selector.appendChild(opt);
        });
    },

    criar(nome) {
        if (!nome || this.data[nome]) { Toast.error('Nome inválido ou já existe'); return false; }
        this.salvarPaginaAtual();
        this.data[nome] = Array(this.maxPaginas).fill('');
        this.atual = nome;
        this.paginaAtual = 0;
        this.salvar();
        this.atualizarSelector();
        this.carregar();
        Toast.success(`Caderno "${nome}" criado!`);
        return true;
    },

    renomear(novoNome) {
        if (!novoNome || novoNome === this.atual || this.data[novoNome]) { Toast.error('Nome inválido'); return false; }
        this.salvarPaginaAtual();
        this.data[novoNome] = this.data[this.atual];
        delete this.data[this.atual];
        this.atual = novoNome;
        this.salvar();
        this.atualizarSelector();
        Toast.success(`Renomeado para "${novoNome}"`);
        return true;
    },

    irParaPagina(p) {
        if (p < 0 || p >= this.maxPaginas) return;
        this.salvarPaginaAtual();
        this.paginaAtual = p;
        this.salvar();
        this.carregar();
    },

    paginaAnterior() { if (this.paginaAtual > 0) this.irParaPagina(this.paginaAtual - 1); },
    proximaPagina() { if (this.paginaAtual < this.maxPaginas - 1) this.irParaPagina(this.paginaAtual + 1); },

    trocar(nome) {
        if (!this.data[nome]) return;
        this.salvarPaginaAtual();
        this.atual = nome;
        this.paginaAtual = 0;
        this.salvar();
        this.carregar();
    }
};

// IA - Funciona em Web (servidor) e Android (API direta)
const IA = {
    loading: false,
    progressBar: null,
    API_KEY_STORAGE: 'groq_api_key',
    GROQ_API_URL: 'https://api.groq.com/openai/v1/chat/completions',
    GROQ_MODEL: 'llama-3.3-70b-versatile',

    init() {
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'ai-progress';
        document.body.appendChild(this.progressBar);
    },

    // Detecta se está rodando no Android/Capacitor (sem servidor)
    isAndroid() {
        return window.Capacitor?.isNativePlatform?.() || 
               window.location.protocol === 'capacitor:' ||
               window.location.protocol === 'file:' ||
               (navigator.userAgent.includes('Android') && !window.location.hostname);
    },

    // Obtém a chave da API salva localmente
    getApiKey() {
        return localStorage.getItem(this.API_KEY_STORAGE) || '';
    },

    // Salva a chave da API localmente
    setApiKey(key) {
        if (key && key.trim()) {
            localStorage.setItem(this.API_KEY_STORAGE, key.trim());
            Toast.success('Chave da IA salva!');
            return true;
        }
        return false;
    },

    // Modal para configurar a chave da API
    mostrarConfiguracao() {
        const existingModal = document.getElementById('ia-config-modal');
        if (existingModal) existingModal.remove();

        const currentKey = this.getApiKey();
        const maskedKey = currentKey ? currentKey.substring(0, 8) + '...' + currentKey.substring(currentKey.length - 4) : '';

        const modal = document.createElement('div');
        modal.id = 'ia-config-modal';
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal-content privacy-modal">
                <div class="modal-header">
                    <span style="font-size: 32px;">🤖</span>
                    <h3 class="modal-title">Configurar IA</h3>
                </div>
                <div class="modal-body">
                    <p style="margin-bottom: 16px; color: var(--text-secondary); font-size: 14px;">
                        Para usar a IA, você precisa de uma chave da API Groq (gratuita).<br>
                        <a href="https://console.groq.com/keys" target="_blank" style="color: var(--primary-500);">
                            👉 Obter chave grátis em console.groq.com
                        </a>
                    </p>
                    <div class="input-group">
                        <label>Chave da API Groq</label>
                        <input type="password" id="ia-api-key-input" class="input" 
                               placeholder="gsk_..." value="${currentKey}"
                               style="font-family: monospace;">
                        <small>${currentKey ? '✅ Chave configurada: ' + maskedKey : '❌ Nenhuma chave configurada'}</small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="document.getElementById('ia-config-modal').remove()">Cancelar</button>
                    <button class="btn btn-primary" onclick="IA.salvarConfiguracao()">💾 Salvar</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('#ia-api-key-input').focus();
    },

    salvarConfiguracao() {
        const input = document.getElementById('ia-api-key-input');
        if (input && this.setApiKey(input.value)) {
            document.getElementById('ia-config-modal')?.remove();
        } else {
            Toast.error('Digite uma chave válida');
        }
    },

    // Salva a chave da API localmente
    setApiKey(key) {
        if (key && key.trim()) {
            localStorage.setItem(this.API_KEY_STORAGE, key.trim());
            Toast.success('Chave da IA salva!');
            return true;
        }
        return false;
    },

    // Modal para configurar a chave da API
    mostrarConfiguracao() {
        const existingModal = document.getElementById('ia-config-modal');
        if (existingModal) existingModal.remove();

        const currentKey = this.getApiKey();
        const maskedKey = currentKey ? currentKey.substring(0, 8) + '...' + currentKey.substring(currentKey.length - 4) : '';

        const modal = document.createElement('div');
        modal.id = 'ia-config-modal';
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal-content privacy-modal">
                <div class="modal-header">
                    <span style="font-size: 32px;">🤖</span>
                    <h3 class="modal-title">Configurar IA</h3>
                </div>
                <div class="modal-body">
                    <p style="margin-bottom: 16px; color: var(--text-secondary); font-size: 14px;">
                        Para usar a IA no app Android, você precisa de uma chave da API Groq.<br>
                        <a href="https://console.groq.com/keys" target="_blank" style="color: var(--primary-500);">
                            👉 Obter chave grátis em groq.com
                        </a>
                    </p>
                    <div class="input-group">
                        <label>Chave da API Groq</label>
                        <input type="password" id="ia-api-key-input" class="input" 
                               placeholder="gsk_..." value="${currentKey}"
                               style="font-family: monospace;">
                        <small>${currentKey ? '✅ Chave configurada: ' + maskedKey : '❌ Nenhuma chave configurada'}</small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="document.getElementById('ia-config-modal').remove()">Cancelar</button>
                    <button class="btn btn-primary" onclick="IA.salvarConfiguracao()">💾 Salvar</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('#ia-api-key-input').focus();
    },

    salvarConfiguracao() {
        const input = document.getElementById('ia-api-key-input');
        if (input && this.setApiKey(input.value)) {
            document.getElementById('ia-config-modal')?.remove();
        } else {
            Toast.error('Digite uma chave válida');
        }
    },

    setLoading(loading) {
        this.loading = loading;
        const btn = document.getElementById('analisar-ia-btn');
        if (loading) { this.progressBar?.classList.add('active'); btn?.classList.add('loading'); }
        else { this.progressBar?.classList.remove('active'); btn?.classList.remove('loading'); }
    },

    // Chama a API do Groq diretamente (para Web/Android)
    async chamarGroqDireto(texto) {
        const apiKey = this.getApiKey();
        if (!apiKey) {
            this.mostrarConfiguracao();
            throw new Error('Configure sua chave da IA primeiro');
        }

        const response = await fetch(this.GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: this.GROQ_MODEL,
                messages: [
                    {
                        role: 'system',
                        content: `Você é um especialista altamente qualificado e adaptável. Seu papel é analisar o contexto do texto fornecido e atuar como um expert no assunto tratado.

INSTRUÇÕES IMPORTANTES:
1. IDENTIFIQUE o tema/área do texto (medicina, direito, programação, literatura, história, matemática, física, etc.)
2. ASSUMA o papel de um especialista nessa área específica
3. CONTINUE o texto de forma natural, coerente e tecnicamente precisa
4. MANTENHA o estilo, tom, nível de formalidade e vocabulário técnico do original
5. ADICIONE informações relevantes e precisas do ponto de vista de um especialista
6. NUNCA inclua comentários, explicações ou meta-texto - apenas a continuação

Responda APENAS com a continuação do texto, sem nenhum preâmbulo.`
                    },
                    { 
                        role: 'user', 
                        content: `Continue este texto como um especialista no assunto:\n\n${texto}` 
                    }
                ],
                temperature: 0.7,
                max_tokens: 1500,
                top_p: 0.9
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem(this.API_KEY_STORAGE);
                throw new Error('Chave da API inválida. Configure novamente.');
            }
            throw new Error(data.error?.message || 'Erro na API');
        }

        return data.choices?.[0]?.message?.content || '';
    },

    // Chama o servidor local (para Web)
    async chamarServidor(texto) {
        const response = await fetch('/api/continue-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: texto })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Erro no servidor');
        return data.continuation;
    },

    async continuarTexto() {
        const pagina = document.getElementById('pagina-caderno');
        const texto = pagina?.textContent?.trim();
        if (!texto) { Toast.warning('Escreva algo primeiro!'); return; }
        if (this.loading) { Toast.info('Aguarde...'); return; }
        
        this.setLoading(true);
        Toast.info('Continuando com IA...');
        
        try {
            let continuacao;
            
            // Se estiver no Android, chama a API diretamente
            if (this.isAndroid()) {
                continuacao = await this.chamarGroqDireto(texto);
            } else {
                // Se estiver na web, usa o servidor
                try {
                    continuacao = await this.chamarServidor(texto);
                } catch (e) {
                    // Se o servidor falhar, tenta direto
                    console.log('Servidor indisponível, tentando API direta...');
                    continuacao = await this.chamarGroqDireto(texto);
                }
            }

            if (continuacao) {
                pagina.innerHTML += '<br><br><span style="color: var(--primary-500); font-style: italic;">✨ IA:</span><br>' + continuacao;
                Cadernos.salvarPaginaAtual();
                Stats.update();
                Toast.success('Pronto!');
            }
        } catch (error) {
            Toast.error(`Erro: ${error.message}`);
        } finally {
            this.setLoading(false);
        }
    }
};

// VOZ - Compatível com Android/Capacitor
const Voz = {
    recognition: null,
    isRecording: false,
    isSupported: false,

    init() {
        try {
            const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SR) {
                console.log('SpeechRecognition não suportado neste navegador/dispositivo');
                this.isSupported = false;
                return;
            }
            this.recognition = new SR();
            this.recognition.lang = 'pt-BR';
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.maxAlternatives = 1;
            
            this.recognition.onresult = (event) => {
                const pagina = document.getElementById('pagina-caderno');
                if (!pagina) return;
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript + ' ';
                    }
                }
                if (finalTranscript) {
                    pagina.innerHTML += finalTranscript;
                    Cadernos.salvarPaginaAtual();
                    Stats.update();
                }
            };
            
            this.recognition.onerror = (e) => {
                console.error('Erro de reconhecimento de voz:', e.error);
                if (e.error === 'not-allowed') {
                    Toast.error('Permissão de microfone negada. Habilite nas configurações.');
                } else if (e.error === 'no-speech') {
                    Toast.warning('Nenhuma fala detectada. Tente novamente.');
                    // Não parar, deixar o usuário tentar novamente
                    return;
                } else if (e.error === 'network') {
                    // Reconhecimento de voz do Chrome/Electron requer internet
                    Toast.error('🌐 Reconhecimento de voz requer internet. Conecte-se e tente novamente.');
                } else if (e.error === 'audio-capture') {
                    Toast.error('Microfone não encontrado ou em uso por outro aplicativo.');
                } else if (e.error === 'service-not-allowed') {
                    Toast.error('Serviço de voz não permitido. Verifique as configurações do navegador.');
                } else if (e.error !== 'aborted') {
                    Toast.error('Erro no microfone: ' + e.error);
                }
                this.parar();
            };
            
            this.recognition.onend = () => {
                if (this.isRecording) {
                    try {
                        setTimeout(() => {
                            if (this.isRecording) this.recognition.start();
                        }, 100);
                    } catch(e) {
                        console.error('Erro ao reiniciar gravação:', e);
                        this.parar();
                    }
                }
            };
            
            this.isSupported = true;
        } catch (e) {
            console.error('Erro ao inicializar reconhecimento de voz:', e);
            this.isSupported = false;
        }
    },

    toggle() {
        if (this.isRecording) {
            this.parar();
        } else {
            this.iniciar();
        }
    },

    async iniciar() {
        if (!this.isSupported || !this.recognition) {
            Toast.error('Reconhecimento de voz não suportado neste dispositivo');
            return;
        }
        
        // Verificar conexão de rede (reconhecimento de voz requer internet)
        if (!navigator.onLine) {
            Toast.error('🌐 Sem conexão. O reconhecimento de voz requer internet.');
            return;
        }
        
        // Verificar permissão de microfone
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                await navigator.mediaDevices.getUserMedia({ audio: true });
            }
        } catch (e) {
            Toast.error('Permissão de microfone negada');
            return;
        }
        
        try {
            this.recognition.start();
            this.isRecording = true;
            const btn = document.getElementById('voz-btn');
            if (btn) btn.classList.add('gravando');
            Toast.info('🎤 Gravando... Fale agora!');
        } catch (e) {
            console.error('Erro ao iniciar gravação:', e);
            if (e.message && e.message.includes('already started')) {
                // Já está gravando, apenas ignora
                return;
            }
            Toast.error('Não foi possível iniciar a gravação');
            this.isRecording = false;
        }
    },

    parar() {
        try {
            if (this.recognition && this.isRecording) {
                this.recognition.stop();
            }
        } catch (e) {
            console.error('Erro ao parar gravação:', e);
        }
        this.isRecording = false;
        const btn = document.getElementById('voz-btn');
        if (btn) btn.classList.remove('gravando');
        Toast.success('Gravação finalizada');
    }
};

// PDF
const PDF = {
    A4_WIDTH: 794,
    A4_HEIGHT: 1123,

    getTurnoEmoji(turno) {
        const turnos = {
            'matutino': '☀️ Matutino',
            'vespertino': '🌤️ Vespertino',
            'noturno': '🌙 Noturno',
            'integral': '📚 Integral'
        };
        return turnos[turno] || turno;
    },

    // Processar conteúdo HTML para adicionar estilos inline às tabelas
    processarConteudoParaPDF(html) {
        // Criar elemento temporário para manipular o HTML
        const temp = document.createElement('div');
        temp.innerHTML = html;
        
        // Estilizar tabelas
        temp.querySelectorAll('table').forEach(table => {
            table.style.cssText = 'width:100%;border-collapse:collapse;margin:10px 0;background:#fff;border:1px solid #334155;';
        });
        
        // Estilizar cabeçalhos de tabela
        temp.querySelectorAll('th').forEach(th => {
            th.style.cssText = 'border:1px solid #334155;padding:8px 10px;text-align:left;background:#e0e7ff;color:#3730a3;font-weight:600;font-size:12px;';
        });
        
        // Estilizar células de tabela
        temp.querySelectorAll('td').forEach(td => {
            td.style.cssText = 'border:1px solid #334155;padding:8px 10px;text-align:left;background:#fff;font-size:12px;';
        });
        
        // Estilizar linhas horizontais
        temp.querySelectorAll('hr').forEach(hr => {
            hr.style.cssText = 'border:none;height:2px;background:linear-gradient(90deg,transparent,#6366f1,transparent);margin:12px 0;';
        });
        
        // Estilizar links
        temp.querySelectorAll('a').forEach(a => {
            a.style.cssText = 'color:#4f46e5;text-decoration:underline;';
        });
        
        // Estilizar listas
        temp.querySelectorAll('ul, ol').forEach(list => {
            list.style.cssText = 'margin:8px 0;padding-left:24px;';
        });
        
        temp.querySelectorAll('li').forEach(li => {
            li.style.cssText = 'margin:4px 0;';
        });
        
        return temp.innerHTML;
    },

    async exportar() {
        Cadernos.salvarPaginaAtual();
        
        // Salvar também os dados atuais do cabeçalho antes de exportar
        ['data', 'materia', 'professor', 'turno'].forEach(campo => {
            const el = document.getElementById(`campo-${campo}`);
            if (el && el.value) {
                localStorage.setItem(`${campo}-${Cadernos.atual}-${Cadernos.paginaAtual}`, el.value);
            }
        });
        
        const titulo = Cadernos.atual || 'Caderno';
        const todasPaginas = Cadernos.data[Cadernos.atual] || [];
        const paginasComConteudo = [];
        todasPaginas.forEach((conteudo, index) => {
            const textoLimpo = conteudo.replace(/<[^>]*>/g, '').trim();
            if (textoLimpo.length > 0) paginasComConteudo.push({ numero: index + 1, conteudo, index });
        });
        if (paginasComConteudo.length === 0) { Toast.warning('Nenhuma página com conteúdo'); return; }
        Toast.info(`📄 Exportando ${paginasComConteudo.length} página(s)...`);
        try {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            for (let i = 0; i < paginasComConteudo.length; i++) {
                if (i > 0) pdf.addPage();
                const paginaData = paginasComConteudo[i];
                const numPagina = paginaData.numero;
                const indexPagina = paginaData.index;
                const conteudoHTML = paginaData.conteudo;
                
                // Buscar dados do cabeçalho - procurar na página atual ou herdar das anteriores
                let data = '', materia = '', professor = '', turno = '';
                
                // Procurar dados do índice atual até o 0
                for (let idx = indexPagina; idx >= 0; idx--) {
                    if (!data) data = localStorage.getItem(`data-${Cadernos.atual}-${idx}`) || '';
                    if (!materia) materia = localStorage.getItem(`materia-${Cadernos.atual}-${idx}`) || '';
                    if (!professor) professor = localStorage.getItem(`professor-${Cadernos.atual}-${idx}`) || '';
                    if (!turno) turno = localStorage.getItem(`turno-${Cadernos.atual}-${idx}`) || '';
                    // Se encontrou todos, pode parar
                    if (data && materia && professor && turno) break;
                }
                
                const dataFormatada = data ? new Date(data + 'T00:00:00').toLocaleDateString('pt-BR') : '';
                const turnoFormatado = turno ? this.getTurnoEmoji(turno) : '';
                
                // Montar badges do cabeçalho
                let badges = '';
                if (dataFormatada) badges += `<span style="background:rgba(255,255,255,0.15);padding:4px 10px;border-radius:12px;color:#fff;font-size:10px;">📅 ${dataFormatada}</span>`;
                if (materia) badges += `<span style="background:rgba(255,255,255,0.15);padding:4px 10px;border-radius:12px;color:#fff;font-size:10px;">📚 ${materia}</span>`;
                if (professor) badges += `<span style="background:rgba(255,255,255,0.15);padding:4px 10px;border-radius:12px;color:#fff;font-size:10px;">👨‍🏫 ${professor}</span>`;
                if (turnoFormatado) badges += `<span style="background:rgba(255,255,255,0.15);padding:4px 10px;border-radius:12px;color:#fff;font-size:10px;">${turnoFormatado}</span>`;
                
                // Processar conteúdo para adicionar estilos inline às tabelas
                const conteudoProcessado = this.processarConteudoParaPDF(conteudoHTML);
                
                const htmlPagina = `<div style="width:${this.A4_WIDTH}px;height:${this.A4_HEIGHT}px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:15px;box-sizing:border-box;font-family:Segoe UI,sans-serif;"><div style="background:#fff;border-radius:16px;box-shadow:0 20px 40px rgba(0,0,0,0.2);height:${this.A4_HEIGHT - 30}px;display:flex;flex-direction:column;overflow:hidden;"><div style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#a855f7 100%);padding:16px 20px;flex-shrink:0;"><div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;"><div style="width:36px;height:36px;background:rgba(255,255,255,0.2);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;">📓</div><h1 style="margin:0;font-size:20px;color:#fff;font-weight:700;">${titulo}</h1></div><div style="display:flex;gap:8px;flex-wrap:wrap;">${badges}</div></div><div style="flex:1;position:relative;overflow:hidden;background:#fefefe;"><div style="position:absolute;left:45px;top:0;bottom:0;width:2px;background:#fca5a5;"></div><div style="margin-left:55px;margin-right:25px;padding:18px 20px 18px 10px;height:100%;overflow:hidden;box-sizing:border-box;"><div style="font-size:14px;line-height:1.7;color:#1e293b;word-wrap:break-word;overflow-wrap:break-word;max-width:100%;">${conteudoProcessado}</div></div></div><div style="background:linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%);padding:12px 25px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid #e2e8f0;flex-shrink:0;"><div style="display:flex;align-items:center;gap:8px;"><div style="width:28px;height:28px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:6px;display:flex;align-items:center;justify-content:center;color:white;font-size:12px;">🤖</div><div><div style="font-size:12px;font-weight:600;color:#1e293b;">Caderno Digital com IA</div></div></div><div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;padding:5px 14px;border-radius:12px;font-size:11px;font-weight:600;">Página ${numPagina}</div></div></div></div>`;
                const container = document.createElement('div');
                container.innerHTML = htmlPagina;
                container.style.cssText = 'position:absolute;left:0;top:0;z-index:9999;';
                document.body.appendChild(container);
                await new Promise(r => setTimeout(r, 150));
                const canvas = await html2canvas(container.firstElementChild, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#667eea', logging: false, width: this.A4_WIDTH, height: this.A4_HEIGHT });
                const imgData = canvas.toDataURL('image/jpeg', 0.92);
                pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
                document.body.removeChild(container);
            }
            pdf.save(`${Cadernos.atual || 'Caderno'}.pdf`);
            Toast.success('PDF exportado!');
        } catch (error) {
            Toast.error('Erro ao exportar: ' + error.message);
        }
    }
};

// WHATSAPP
const WhatsApp = {
    modal: null,
    abrir() {
        this.modal = document.getElementById('modal-whatsapp');
        if (this.modal) {
            this.modal.classList.add('active');
            const pagina = document.getElementById('pagina-caderno');
            const resumoInput = document.getElementById('whatsapp-resumo');
            if (pagina && resumoInput) { resumoInput.value = pagina.textContent.substring(0, 300); this.atualizarContador(); }
        }
    },
    fechar() { this.modal?.classList.remove('active'); },
    atualizarContador() {
        const resumo = document.getElementById('whatsapp-resumo');
        const contador = document.getElementById('char-count');
        if (resumo && contador) contador.textContent = resumo.value.length;
    },
    enviar() {
        const resumo = document.getElementById('whatsapp-resumo')?.value?.trim();
        const ddd = document.getElementById('whatsapp-ddd')?.value?.trim();
        const numero = document.getElementById('whatsapp-numero')?.value?.trim();
        if (!ddd || !numero) { Toast.warning('Preencha DDD e número'); return; }
        if (ddd.length !== 2 || numero.length < 8) { Toast.warning('Número inválido'); return; }
        const texto = encodeURIComponent(`📚 *${Cadernos.atual}* - Página ${Cadernos.paginaAtual + 1}\n\n${resumo}`);
        window.open(`https://wa.me/55${ddd}${numero}?text=${texto}`, '_blank');
        this.fechar();
        Toast.success('Abrindo WhatsApp...');
    }
};

// HIGHLIGHT
const Highlight = {
    aplicar(colorClass) {
        const selection = window.getSelection();
        if (selection.rangeCount === 0) return;
        const range = selection.getRangeAt(0);
        if (range.collapsed) { Toast.info('Selecione um texto'); return; }
        const span = document.createElement('span');
        span.className = colorClass;
        try { range.surroundContents(span); } catch (e) { const contents = range.extractContents(); span.appendChild(contents); range.insertNode(span); }
        selection.removeAllRanges();
        Cadernos.salvarPaginaAtual();
        Toast.success('Texto destacado!');
    }
};

// ATALHOS
const Atalhos = {
    init() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); Cadernos.salvarPaginaAtual(); Toast.success('Salvo!'); }
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') { e.preventDefault(); IA.continuarTexto(); }
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') { e.preventDefault(); PDF.exportar(); }
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') { e.preventDefault(); Theme.toggle(); }
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') { e.preventDefault(); const nome = prompt('Nome do novo caderno:'); if (nome) Cadernos.criar(nome); }
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') { e.preventDefault(); BuscarSubstituir.abrir(); }
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') { e.preventDefault(); ContadorDetalhado.mostrar(); }
            if (e.key === 'PageUp') { e.preventDefault(); Cadernos.paginaAnterior(); }
            if (e.key === 'PageDown') { e.preventDefault(); Cadernos.proximaPagina(); }
            // Formatação com Ctrl
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') { e.preventDefault(); Formatacao.execCommand('bold'); }
            if ((e.ctrlKey || e.metaKey) && e.key === 'i' && !e.shiftKey) { e.preventDefault(); Formatacao.execCommand('italic'); }
            if ((e.ctrlKey || e.metaKey) && e.key === 'u') { e.preventDefault(); Formatacao.execCommand('underline'); }
        });
    }
};

// AUTOSAVE
const AutoSave = {
    timer: null,
    delay: 1000,
    verificandoLimite: false,

    init() {
        const pagina = document.getElementById('pagina-caderno');
        if (!pagina) return;
        pagina.addEventListener('input', () => {
            this.verificarLimiteImediato();
            clearTimeout(this.timer);
            this.timer = setTimeout(() => { Cadernos.salvarPaginaAtual(); Stats.update(); }, this.delay);
        });
        pagina.addEventListener('paste', () => { setTimeout(() => this.verificarLimiteImediato(), 100); });
        ['data', 'materia', 'professor', 'turno'].forEach(campo => {
            const el = document.getElementById(`campo-${campo}`);
            if (el) {
                el.addEventListener(campo === 'turno' ? 'change' : 'input', () => {
                    localStorage.setItem(`${campo}-${Cadernos.atual}-${Cadernos.paginaAtual}`, el.value);
                });
            }
        });
    },

    verificarLimiteImediato() {
        if (this.verificandoLimite) return;
        const pagina = document.getElementById('pagina-caderno');
        if (!pagina) return;
        const texto = pagina.textContent || '';
        Stats.update();
        if (texto.length > Cadernos.MAX_CHARS_PER_PAGE) {
            this.verificandoLimite = true;
            Cadernos.verificarLimiteCaracteres();
            setTimeout(() => { this.verificandoLimite = false; }, 500);
        }
    }
};

// APARENCIA
const Aparencia = {
    fontes: [
        'kalam', 'patrick', 'dancing', 'caveat', 'indie', 'shadows', 'gloria',
        'arial', 'times', 'georgia', 'verdana', 'tahoma', 'trebuchet',
        'roboto', 'opensans', 'montserrat', 'poppins', 'lato',
        'courier', 'consolas', 'monaco'
    ],
    
    init() { this.initFonte(); this.initCor(); },
    
    initFonte() {
        const selector = document.getElementById('font-selector-toolbar');
        if (!selector) return;
        const fonteSalva = localStorage.getItem('fonte') || 'kalam';
        selector.value = `font-${fonteSalva}`;
        this.aplicarFonte(`font-${fonteSalva}`);
        this.atualizarPreviewSeletor(selector);
        
        selector.addEventListener('change', (e) => { 
            this.aplicarFonte(e.target.value); 
            localStorage.setItem('fonte', e.target.value.replace('font-', '')); 
            this.atualizarPreviewSeletor(selector);
            Toast.info('Fonte alterada!'); 
        });
    },
    
    aplicarFonte(fontClass) {
        const pagina = document.getElementById('pagina-caderno');
        if (!pagina) return;
        // Remove todas as classes de fonte
        this.fontes.forEach(f => pagina.classList.remove(`font-${f}`));
        pagina.classList.add(fontClass);
    },
    
    atualizarPreviewSeletor(selector) {
        // Aplica a fonte selecionada ao próprio seletor
        const selectedOption = selector.options[selector.selectedIndex];
        if (selectedOption) {
            const fontStyle = selectedOption.style.fontFamily;
            selector.style.fontFamily = fontStyle;
        }
    },
    
    initCor() {
        const selector = document.getElementById('color-selector-toolbar');
        if (!selector) return;
        const corSalva = localStorage.getItem('corCaneta') || 'black';
        selector.value = corSalva;
        this.aplicarCor(corSalva);
        selector.addEventListener('change', (e) => { this.aplicarCor(e.target.value); localStorage.setItem('corCaneta', e.target.value); Toast.info('Cor alterada!'); });
    },
    
    aplicarCor(cor) { const pagina = document.getElementById('pagina-caderno'); if (pagina) pagina.style.color = cor; }
};

// FORMATAÇÃO ESTILO WORD
const Formatacao = {
    currentFontSize: 16,
    
    init() {
        this.bindButtons();
        this.initTableModal();
        this.initLinkModal();
        this.updateAlignmentButtons();
    },

    execCommand(command, value = null) {
        document.execCommand(command, false, value);
        Cadernos.salvarPaginaAtual();
        this.updateFormatButtons();
    },

    bindButtons() {
        // Formatação de texto
        document.getElementById('format-bold')?.addEventListener('click', () => this.execCommand('bold'));
        document.getElementById('format-italic')?.addEventListener('click', () => this.execCommand('italic'));
        document.getElementById('format-underline')?.addEventListener('click', () => this.execCommand('underline'));
        document.getElementById('format-strike')?.addEventListener('click', () => this.execCommand('strikeThrough'));

        // Tamanho da fonte
        document.getElementById('format-size-down')?.addEventListener('click', () => this.changeFontSize(-2));
        document.getElementById('format-size-up')?.addEventListener('click', () => this.changeFontSize(2));
        document.getElementById('format-font-size')?.addEventListener('change', (e) => {
            this.currentFontSize = parseInt(e.target.value);
            this.applyFontSize();
        });

        // Alinhamento
        document.getElementById('format-align-left')?.addEventListener('click', () => this.setAlignment('left'));
        document.getElementById('format-align-center')?.addEventListener('click', () => this.setAlignment('center'));
        document.getElementById('format-align-right')?.addEventListener('click', () => this.setAlignment('right'));
        document.getElementById('format-align-justify')?.addEventListener('click', () => this.setAlignment('justify'));

        // Listas
        document.getElementById('format-list-bullet')?.addEventListener('click', () => this.execCommand('insertUnorderedList'));
        document.getElementById('format-list-number')?.addEventListener('click', () => this.execCommand('insertOrderedList'));
        document.getElementById('format-indent-decrease')?.addEventListener('click', () => this.execCommand('outdent'));
        document.getElementById('format-indent-increase')?.addEventListener('click', () => this.execCommand('indent'));

        // Inserir
        document.getElementById('format-insert-table')?.addEventListener('click', () => this.openTableModal());
        document.getElementById('format-insert-hr')?.addEventListener('click', () => this.insertHR());
        document.getElementById('format-insert-link')?.addEventListener('click', () => this.openLinkModal());
        document.getElementById('format-clear')?.addEventListener('click', () => this.clearFormatting());

        // Desfazer/Refazer
        document.getElementById('format-undo')?.addEventListener('click', () => this.execCommand('undo'));
        document.getElementById('format-redo')?.addEventListener('click', () => this.execCommand('redo'));

        // Atualizar estado dos botões ao selecionar texto
        document.getElementById('pagina-caderno')?.addEventListener('mouseup', () => this.updateFormatButtons());
        document.getElementById('pagina-caderno')?.addEventListener('keyup', () => this.updateFormatButtons());
    },

    changeFontSize(delta) {
        this.currentFontSize = Math.max(10, Math.min(48, this.currentFontSize + delta));
        document.getElementById('format-font-size').value = this.currentFontSize + 'px';
        this.applyFontSize();
    },

    applyFontSize() {
        const selection = window.getSelection();
        if (selection.rangeCount === 0 || selection.isCollapsed) {
            const pagina = document.getElementById('pagina-caderno');
            if (pagina) pagina.style.fontSize = this.currentFontSize + 'px';
        } else {
            this.execCommand('fontSize', '7');
            const fontElements = document.querySelectorAll('#pagina-caderno font[size="7"]');
            fontElements.forEach(el => {
                el.removeAttribute('size');
                el.style.fontSize = this.currentFontSize + 'px';
            });
        }
        Cadernos.salvarPaginaAtual();
    },

    setAlignment(align) {
        const pagina = document.getElementById('pagina-caderno');
        if (!pagina) return;
        
        const selection = window.getSelection();
        if (selection.rangeCount > 0 && !selection.isCollapsed) {
            this.execCommand('justify' + align.charAt(0).toUpperCase() + align.slice(1));
        } else {
            pagina.style.textAlign = align;
        }
        
        this.updateAlignmentButtons(align);
        Cadernos.salvarPaginaAtual();
        Toast.info(`Texto alinhado à ${align === 'left' ? 'esquerda' : align === 'right' ? 'direita' : align === 'center' ? 'centro' : 'justificado'}`);
    },

    updateAlignmentButtons(active = null) {
        ['left', 'center', 'right', 'justify'].forEach(align => {
            const btn = document.getElementById(`format-align-${align}`);
            if (btn) btn.classList.toggle('active', align === active);
        });
    },

    updateFormatButtons() {
        const updateBtn = (id, command) => {
            const btn = document.getElementById(id);
            if (btn) btn.classList.toggle('active', document.queryCommandState(command));
        };
        updateBtn('format-bold', 'bold');
        updateBtn('format-italic', 'italic');
        updateBtn('format-underline', 'underline');
        updateBtn('format-strike', 'strikeThrough');
    },

    insertHR() {
        this.execCommand('insertHTML', '<hr>');
        Toast.success('Linha inserida!');
    },

    clearFormatting() {
        this.execCommand('removeFormat');
        Toast.success('Formatação removida!');
    },

    // Modal de Tabela
    initTableModal() {
        const modal = document.getElementById('modal-table');
        const grid = document.getElementById('table-grid');
        const rowsInput = document.getElementById('table-rows');
        const colsInput = document.getElementById('table-cols');
        const sizeInfo = document.getElementById('table-size-info');
        
        if (!modal || !grid) return;

        // Criar grid 8x8
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const cell = document.createElement('button');
                cell.className = 'table-cell-btn';
                cell.dataset.row = r + 1;
                cell.dataset.col = c + 1;
                cell.addEventListener('mouseenter', () => {
                    this.highlightTableCells(r + 1, c + 1);
                    sizeInfo.textContent = `${r + 1} x ${c + 1}`;
                    rowsInput.value = r + 1;
                    colsInput.value = c + 1;
                });
                cell.addEventListener('click', () => {
                    rowsInput.value = r + 1;
                    colsInput.value = c + 1;
                    this.insertTable(r + 1, c + 1);
                });
                grid.appendChild(cell);
            }
        }

        grid.addEventListener('mouseleave', () => {
            this.highlightTableCells(0, 0);
            sizeInfo.textContent = 'Selecione o tamanho';
        });

        document.getElementById('table-cancel')?.addEventListener('click', () => this.closeTableModal());
        document.getElementById('table-insert')?.addEventListener('click', () => {
            const rows = parseInt(rowsInput.value) || 3;
            const cols = parseInt(colsInput.value) || 3;
            this.insertTable(rows, cols);
        });
    },

    highlightTableCells(rows, cols) {
        document.querySelectorAll('.table-cell-btn').forEach(cell => {
            const r = parseInt(cell.dataset.row);
            const c = parseInt(cell.dataset.col);
            cell.classList.toggle('selected', r <= rows && c <= cols);
        });
    },

    openTableModal() {
        document.getElementById('modal-table')?.classList.add('active');
    },

    closeTableModal() {
        document.getElementById('modal-table')?.classList.remove('active');
        this.highlightTableCells(0, 0);
    },

    insertTable(rows, cols) {
        let html = '<table><tbody>';
        for (let r = 0; r < rows; r++) {
            html += '<tr>';
            for (let c = 0; c < cols; c++) {
                if (r === 0) {
                    html += `<th>Título ${c + 1}</th>`;
                } else {
                    html += '<td>&nbsp;</td>';
                }
            }
            html += '</tr>';
        }
        html += '</tbody></table><p></p>';
        
        this.execCommand('insertHTML', html);
        this.closeTableModal();
        Toast.success(`Tabela ${rows}x${cols} inserida!`);
    },

    // Modal de Link
    initLinkModal() {
        document.getElementById('link-cancel')?.addEventListener('click', () => this.closeLinkModal());
        document.getElementById('link-insert')?.addEventListener('click', () => {
            const text = document.getElementById('link-text')?.value || 'Link';
            const url = document.getElementById('link-url')?.value;
            if (!url) {
                Toast.warning('Digite uma URL válida');
                return;
            }
            this.insertLink(text, url);
        });
    },

    openLinkModal() {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();
        const textInput = document.getElementById('link-text');
        if (textInput) textInput.value = selectedText;
        document.getElementById('modal-link')?.classList.add('active');
    },

    closeLinkModal() {
        document.getElementById('modal-link')?.classList.remove('active');
        document.getElementById('link-text').value = '';
        document.getElementById('link-url').value = '';
    },

    insertLink(text, url) {
        const html = `<a href="${url}" target="_blank">${text}</a>`;
        this.execCommand('insertHTML', html);
        this.closeLinkModal();
        Toast.success('Link inserido!');
    }
};

// BUSCAR E SUBSTITUIR
const BuscarSubstituir = {
    abrir() {
        const termo = prompt('🔍 Buscar por:');
        if (!termo) return;
        
        const pagina = document.getElementById('pagina-caderno');
        if (!pagina) return;
        
        const texto = pagina.innerHTML;
        const regex = new RegExp(`(${termo})`, 'gi');
        const ocorrencias = (texto.match(regex) || []).length;
        
        if (ocorrencias === 0) {
            Toast.info('Nenhuma ocorrência encontrada');
            return;
        }
        
        const substituir = prompt(`📝 ${ocorrencias} ocorrência(s) encontrada(s).\n\nSubstituir por (deixe vazio para apenas destacar):`);
        
        if (substituir !== null && substituir !== '') {
            pagina.innerHTML = texto.replace(regex, substituir);
            Cadernos.salvarPaginaAtual();
            Toast.success(`${ocorrencias} substituição(ões) realizada(s)!`);
        } else {
            // Apenas destaca
            pagina.innerHTML = texto.replace(regex, '<mark style="background:#fef08a;padding:2px 4px;border-radius:2px;">$1</mark>');
            Toast.info(`${ocorrencias} ocorrência(s) destacada(s)`);
        }
    }
};

// CONTADOR DE PALAVRAS DETALHADO
const ContadorDetalhado = {
    mostrar() {
        const pagina = document.getElementById('pagina-caderno');
        if (!pagina) return;
        
        const texto = pagina.textContent || '';
        const palavras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
        const caracteres = texto.length;
        const caracteresSSemEspaco = texto.replace(/\s/g, '').length;
        const paragrafos = (pagina.innerHTML.split(/<br>|<\/p>|<\/div>/gi).filter(p => p.trim()).length) || 1;
        const linhas = Math.ceil(caracteres / 80) || 1;
        const tempoLeitura = Math.ceil(palavras / 200); // 200 palavras por minuto
        
        Toast.info(`
            📊 Estatísticas:
            • Palavras: ${palavras}
            • Caracteres: ${caracteres}
            • Sem espaços: ${caracteresSSemEspaco}
            • Parágrafos: ~${paragrafos}
            • Linhas: ~${linhas}
            • Tempo de leitura: ~${tempoLeitura} min
        `.trim(), 8000);
    }
};

// LIMPEZA DE CACHE
const Cache = {
    limpar() {
        if (!confirm('⚠️ Tem certeza que deseja limpar TODOS os dados?\n\nIsso irá apagar:\n• Todos os cadernos\n• Todas as configurações\n• Todo o histórico\n\nEsta ação NÃO pode ser desfeita!')) {
            return;
        }
        
        localStorage.clear();
        sessionStorage.clear();
        
        // Limpar cookies se houver
        document.cookie.split(";").forEach(c => {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        
        Toast.success('🗑️ Cache limpo com sucesso! Recarregando...');
        
        setTimeout(() => {
            location.reload();
        }, 1500);
    },
    
    exportarDados() {
        const dados = {
            cadernos: Cadernos.data,
            cadernoAtual: Cadernos.atual,
            paginaAtual: Cadernos.paginaAtual,
            tema: Theme.current,
            fonte: localStorage.getItem('fonte'),
            corCaneta: localStorage.getItem('corCaneta'),
            exportadoEm: new Date().toISOString(),
            versao: '2.1.0'
        };
        
        // Adicionar dados dos cabeçalhos
        Object.keys(Cadernos.data).forEach(caderno => {
            for (let i = 0; i < Cadernos.maxPaginas; i++) {
                ['data', 'materia', 'professor', 'turno'].forEach(campo => {
                    const valor = localStorage.getItem(`${campo}-${caderno}-${i}`);
                    if (valor) {
                        dados[`${campo}-${caderno}-${i}`] = valor;
                    }
                });
            }
        });
        
        const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `caderno-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        Toast.success('📦 Backup exportado com sucesso!');
    },
    
    importarDados() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const dados = JSON.parse(event.target.result);
                    
                    if (!dados.cadernos) {
                        Toast.error('Arquivo de backup inválido');
                        return;
                    }
                    
                    if (!confirm('⚠️ Isso irá substituir todos os dados atuais. Continuar?')) {
                        return;
                    }
                    
                    // Restaurar dados
                    localStorage.setItem('cadernos', JSON.stringify(dados.cadernos));
                    localStorage.setItem('cadernoAtual', dados.cadernoAtual || 'Caderno Principal');
                    localStorage.setItem('paginaAtual', dados.paginaAtual || 0);
                    if (dados.tema) localStorage.setItem('theme', dados.tema);
                    if (dados.fonte) localStorage.setItem('fonte', dados.fonte);
                    if (dados.corCaneta) localStorage.setItem('corCaneta', dados.corCaneta);
                    
                    // Restaurar dados dos cabeçalhos
                    Object.keys(dados).forEach(key => {
                        if (key.startsWith('data-') || key.startsWith('materia-') || 
                            key.startsWith('professor-') || key.startsWith('turno-')) {
                            localStorage.setItem(key, dados[key]);
                        }
                    });
                    
                    Toast.success('📦 Backup restaurado! Recarregando...');
                    setTimeout(() => location.reload(), 1500);
                    
                } catch (error) {
                    Toast.error('Erro ao ler arquivo: ' + error.message);
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }
};

// SISTEMA DE PRIVACIDADE COM CADEADO
const Privacidade = {
    isLocked: false,
    
    // Funções de criptografia simples
    encrypt(text) {
        if (!text) return '';
        return btoa(encodeURIComponent(text).split('').map((c, i) => 
            String.fromCharCode(c.charCodeAt(0) ^ ((i % 10) + 5))
        ).join(''));
    },
    
    decrypt(text) {
        if (!text) return '';
        try {
            return decodeURIComponent(atob(text).split('').map((c, i) => 
                String.fromCharCode(c.charCodeAt(0) ^ ((i % 10) + 5))
            ).join(''));
        } catch {
            return '';
        }
    },
    
    init() {
        // Verificar se já tem senha cadastrada
        const hasPassword = localStorage.getItem('privacidade_senha');
        const lockBtn = document.getElementById('privacy-lock-btn');
        
        if (lockBtn) {
            lockBtn.title = hasPassword ? 'Bloquear/Desbloquear' : 'Configurar Privacidade';
        }
        
        // Verificar se estava bloqueado ao fechar
        const wasLocked = localStorage.getItem('privacidade_bloqueado') === 'true';
        if (wasLocked && hasPassword) {
            // Restaurar estado bloqueado visualmente
            this.isLocked = true;
            document.querySelector('.book-container')?.classList.add('privacy-locked');
            document.querySelector('.cabecalho-caderno')?.classList.add('cabecalho-locked');
            document.getElementById('pagina-caderno')?.setAttribute('contenteditable', 'false');
            
            // Desabilitar campos do cabeçalho
            document.querySelectorAll('.cabecalho-caderno input, .cabecalho-caderno select').forEach(el => {
                el.disabled = true;
            });
            
            // Atualizar ícone do cadeado para fechado
            const lockOpen = document.getElementById('lock-icon-open');
            const lockClosed = document.getElementById('lock-icon-closed');
            if (lockOpen) lockOpen.classList.add('lock-icon-hidden');
            if (lockClosed) lockClosed.classList.remove('lock-icon-hidden');
            
            if (lockBtn) lockBtn.classList.add('locked');
        }
        
        this.bindEvents();
    },
    
    bindEvents() {
        // Botão do cadeado
        document.getElementById('privacy-lock-btn')?.addEventListener('click', () => this.toggleLock());
        
        // Botão de configurações (ícone da chave)
        document.getElementById('privacy-settings-btn')?.addEventListener('click', () => this.abrirConfiguracao());
        
        // Modal de configuração
        document.getElementById('privacy-setup-save')?.addEventListener('click', () => this.salvarSenha());
        document.getElementById('privacy-setup-cancel')?.addEventListener('click', () => this.fecharModal('modal-privacy-setup'));
        
        // Modal de desbloqueio
        document.getElementById('unlock-submit')?.addEventListener('click', () => this.desbloquear());
        document.getElementById('unlock-forgot')?.addEventListener('click', () => this.mostrarRecuperacao());
        
        // Modal de recuperação
        document.getElementById('recover-verify')?.addEventListener('click', () => this.verificarPalavraChave());
        document.getElementById('recover-save')?.addEventListener('click', () => this.salvarNovaSenha());
        document.getElementById('recover-cancel')?.addEventListener('click', () => this.fecharModal('modal-privacy-recover'));
        
        // Permitir Enter nos inputs
        document.getElementById('privacy-password')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') document.getElementById('privacy-password-confirm')?.focus();
        });
        document.getElementById('privacy-password-confirm')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') document.getElementById('privacy-hint')?.focus();
        });
        document.getElementById('privacy-hint')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.salvarSenha();
        });
        document.getElementById('unlock-password')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.desbloquear();
        });
        document.getElementById('recover-hint')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.verificarPalavraChave();
        });
    },
    
    toggleLock() {
        const hasPassword = localStorage.getItem('privacidade_senha');
        
        if (!hasPassword) {
            // Primeira vez - abrir configuração
            this.abrirConfiguracao();
        } else if (this.isLocked) {
            // Está bloqueado - abrir modal de desbloqueio
            this.abrirDesbloqueio();
        } else {
            // Está desbloqueado - bloquear diretamente
            this.bloquear();
        }
    },
    
    abrirConfiguracao() {
        document.getElementById('modal-privacy-setup').classList.add('active');
        document.getElementById('privacy-password').value = '';
        document.getElementById('privacy-password-confirm').value = '';
        document.getElementById('privacy-hint').value = '';
        document.getElementById('privacy-password').focus();
    },
    
    salvarSenha() {
        const senha = document.getElementById('privacy-password').value;
        const confirmar = document.getElementById('privacy-password-confirm').value;
        const palavraChave = document.getElementById('privacy-hint').value.trim();
        
        if (!senha || senha.length < 4) {
            Toast.error('A senha deve ter pelo menos 4 caracteres');
            return;
        }
        
        if (senha !== confirmar) {
            Toast.error('As senhas não coincidem');
            return;
        }
        
        if (!palavraChave || palavraChave.length < 3) {
            Toast.error('A palavra de recuperação deve ter pelo menos 3 caracteres');
            return;
        }
        
        // Salvar senha e palavra-chave criptografadas
        localStorage.setItem('privacidade_senha', this.encrypt(senha));
        localStorage.setItem('privacidade_palavra', this.encrypt(palavraChave.toLowerCase()));
        
        this.fecharModal('modal-privacy-setup');
        Toast.success('🔐 Senha configurada com sucesso!');
        
        // Atualizar título do botão
        const lockBtn = document.getElementById('privacy-lock-btn');
        if (lockBtn) lockBtn.title = 'Bloquear/Desbloquear';
    },
    
    abrirDesbloqueio() {
        document.getElementById('modal-privacy-unlock').classList.add('active');
        document.getElementById('unlock-password').value = '';
        document.getElementById('unlock-password').focus();
    },
    
    bloquear() {
        this.isLocked = true;
        localStorage.setItem('privacidade_bloqueado', 'true');
        
        // Adicionar classe de blur no container principal e cabeçalho
        document.querySelector('.book-container')?.classList.add('privacy-locked');
        document.querySelector('.cabecalho-caderno')?.classList.add('cabecalho-locked');
        document.getElementById('pagina-caderno')?.setAttribute('contenteditable', 'false');
        
        // Desabilitar campos do cabeçalho
        document.querySelectorAll('.cabecalho-caderno input, .cabecalho-caderno select').forEach(el => {
            el.disabled = true;
        });
        
        // Atualizar ícone do cadeado (troca SVGs)
        const lockOpen = document.getElementById('lock-icon-open');
        const lockClosed = document.getElementById('lock-icon-closed');
        if (lockOpen) lockOpen.classList.add('lock-icon-hidden');
        if (lockClosed) lockClosed.classList.remove('lock-icon-hidden');
        
        const lockBtn = document.getElementById('privacy-lock-btn');
        if (lockBtn) lockBtn.classList.add('locked');
        
        Toast.info('🔒 Conteúdo bloqueado');
    },
    
    desbloquear() {
        const senhaInput = document.getElementById('unlock-password').value;
        const senhaArmazenada = this.decrypt(localStorage.getItem('privacidade_senha') || '');
        
        if (senhaInput === senhaArmazenada) {
            this.isLocked = false;
            localStorage.setItem('privacidade_bloqueado', 'false');
            
            // Remover blur do container principal e cabeçalho
            document.querySelector('.book-container')?.classList.remove('privacy-locked');
            document.querySelector('.cabecalho-caderno')?.classList.remove('cabecalho-locked');
            document.getElementById('pagina-caderno')?.setAttribute('contenteditable', 'true');
            
            // Reabilitar campos do cabeçalho
            document.querySelectorAll('.cabecalho-caderno input, .cabecalho-caderno select').forEach(el => {
                el.disabled = false;
            });
            
            // Atualizar ícone do cadeado (troca SVGs)
            const lockOpen = document.getElementById('lock-icon-open');
            const lockClosed = document.getElementById('lock-icon-closed');
            if (lockOpen) lockOpen.classList.remove('lock-icon-hidden');
            if (lockClosed) lockClosed.classList.add('lock-icon-hidden');
            
            const lockBtn = document.getElementById('privacy-lock-btn');
            if (lockBtn) lockBtn.classList.remove('locked');
            
            this.fecharModal('modal-privacy-unlock');
            Toast.success('🔓 Conteúdo desbloqueado!');
        } else {
            Toast.error('Senha incorreta');
            document.getElementById('unlock-password').value = '';
            document.getElementById('unlock-password').focus();
        }
    },
    
    mostrarRecuperacao() {
        this.fecharModal('modal-privacy-unlock');
        document.getElementById('modal-privacy-recover').classList.add('active');
        document.getElementById('recover-hint').value = '';
        document.getElementById('recover-new-password').value = '';
        document.getElementById('recover-confirm-password').value = '';
        document.getElementById('new-password-group').classList.add('hidden-field');
        document.getElementById('confirm-password-group').classList.add('hidden-field');
        document.getElementById('recover-verify').classList.remove('hidden-field');
        document.getElementById('recover-save').classList.add('hidden-field');
        document.getElementById('recover-hint').focus();
    },
    
    verificarPalavraChave() {
        const palavraInput = document.getElementById('recover-hint').value.trim().toLowerCase();
        const palavraArmazenada = this.decrypt(localStorage.getItem('privacidade_palavra') || '');
        
        if (!palavraInput) {
            Toast.error('Digite a palavra de recuperação');
            return;
        }
        
        if (palavraInput === palavraArmazenada) {
            // Mostrar campos para nova senha
            document.getElementById('new-password-group').classList.remove('hidden-field');
            document.getElementById('confirm-password-group').classList.remove('hidden-field');
            document.getElementById('recover-verify').classList.add('hidden-field');
            document.getElementById('recover-save').classList.remove('hidden-field');
            document.getElementById('recover-hint').disabled = true;
            document.getElementById('recover-new-password').focus();
            Toast.success('✅ Palavra-chave correta! Digite a nova senha.');
        } else {
            Toast.error('Palavra de recuperação incorreta');
            document.getElementById('recover-hint').value = '';
            document.getElementById('recover-hint').focus();
        }
    },
    
    salvarNovaSenha() {
        const novaSenha = document.getElementById('recover-new-password').value;
        const confirmarSenha = document.getElementById('recover-confirm-password').value;
        
        if (!novaSenha || novaSenha.length < 4) {
            Toast.error('A nova senha deve ter pelo menos 4 caracteres');
            return;
        }
        
        if (novaSenha !== confirmarSenha) {
            Toast.error('As senhas não coincidem');
            return;
        }
        
        // Atualizar senha
        localStorage.setItem('privacidade_senha', this.encrypt(novaSenha));
        
        // Resetar modal
        document.getElementById('recover-hint').disabled = false;
        
        this.fecharModal('modal-privacy-recover');
        
        // Desbloquear automaticamente
        this.isLocked = false;
        localStorage.setItem('privacidade_bloqueado', 'false');
        
        document.querySelector('.book-container')?.classList.remove('privacy-locked');
        document.querySelector('.cabecalho-caderno')?.classList.remove('cabecalho-locked');
        document.getElementById('pagina-caderno')?.setAttribute('contenteditable', 'true');
        
        // Reabilitar campos do cabeçalho
        document.querySelectorAll('.cabecalho-caderno input, .cabecalho-caderno select').forEach(el => {
            el.disabled = false;
        });
        
        // Atualizar ícone do cadeado (troca SVGs)
        const lockOpen = document.getElementById('lock-icon-open');
        const lockClosed = document.getElementById('lock-icon-closed');
        if (lockOpen) lockOpen.classList.remove('lock-icon-hidden');
        if (lockClosed) lockClosed.classList.add('lock-icon-hidden');
        
        const lockBtn = document.getElementById('privacy-lock-btn');
        if (lockBtn) lockBtn.classList.remove('locked');
        
        Toast.success('🔑 Senha alterada e conteúdo desbloqueado!');
    },
    
    fecharModal(modalId) {
        document.getElementById(modalId)?.classList.remove('active');
    },
    
    // Remover senha (para uso via console ou configurações futuras)
    removerSenha() {
        if (!confirm('⚠️ Remover a proteção por senha? O conteúdo ficará sempre visível.')) {
            return;
        }
        
        localStorage.removeItem('privacidade_senha');
        localStorage.removeItem('privacidade_palavra');
        localStorage.removeItem('privacidade_bloqueado');
        
        this.isLocked = false;
        
        document.querySelector('.book-container')?.classList.remove('privacy-locked');
        document.querySelector('.cabecalho-caderno')?.classList.remove('cabecalho-locked');
        document.getElementById('pagina-caderno')?.setAttribute('contenteditable', 'true');
        
        // Reabilitar campos do cabeçalho
        document.querySelectorAll('.cabecalho-caderno input, .cabecalho-caderno select').forEach(el => {
            el.disabled = false;
        });
        
        // Atualizar ícone do cadeado (troca SVGs)
        const lockOpen = document.getElementById('lock-icon-open');
        const lockClosed = document.getElementById('lock-icon-closed');
        if (lockOpen) lockOpen.classList.remove('lock-icon-hidden');
        if (lockClosed) lockClosed.classList.add('lock-icon-hidden');
        
        const lockBtn = document.getElementById('privacy-lock-btn');
        if (lockBtn) {
            lockBtn.classList.remove('locked');
            lockBtn.title = 'Configurar Privacidade';
        }
        
        Toast.success('🔓 Proteção por senha removida');
    }
};

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Caderno Digital com IA - Iniciando...');
    Theme.init();
    Cadernos.init();
    IA.init();
    Voz.init();
    AutoSave.init();
    Aparencia.init();
    Atalhos.init();
    Stats.createDisplay();
    Formatacao.init();
    Privacidade.init();

    document.getElementById('pagina-anterior')?.addEventListener('click', () => Cadernos.paginaAnterior());
    document.getElementById('pagina-proxima')?.addEventListener('click', () => Cadernos.proximaPagina());
    document.getElementById('caderno-selector-toolbar')?.addEventListener('change', (e) => Cadernos.trocar(e.target.value));
    document.getElementById('novo-caderno-btn-toolbar')?.addEventListener('click', () => { const nome = prompt('Nome do novo caderno:'); if (nome) Cadernos.criar(nome); });
    document.getElementById('renomear-caderno-btn-toolbar')?.addEventListener('click', () => { const novoNome = prompt('Novo nome:', Cadernos.atual); if (novoNome) Cadernos.renomear(novoNome); });
    document.getElementById('voz-btn')?.addEventListener('click', () => Voz.toggle());
    document.getElementById('analisar-ia-btn')?.addEventListener('click', () => IA.continuarTexto());
    document.getElementById('config-ia-btn')?.addEventListener('click', () => IA.mostrarConfiguracao());
    document.getElementById('exportar-pdf-btn')?.addEventListener('click', () => PDF.exportar());
    document.getElementById('whatsapp-btn')?.addEventListener('click', () => WhatsApp.abrir());
    document.getElementById('whatsapp-cancelar')?.addEventListener('click', () => WhatsApp.fechar());
    document.getElementById('whatsapp-enviar')?.addEventListener('click', () => WhatsApp.enviar());
    document.getElementById('whatsapp-resumo')?.addEventListener('input', () => WhatsApp.atualizarContador());
    document.getElementById('highlight-yellow')?.addEventListener('click', () => Highlight.aplicar('highlight-yellow'));
    document.getElementById('highlight-blue')?.addEventListener('click', () => Highlight.aplicar('highlight-blue'));
    document.getElementById('highlight-green')?.addEventListener('click', () => Highlight.aplicar('highlight-green'));

    const toggleSidebar = document.getElementById('toggle-sidebar');
    if (toggleSidebar) toggleSidebar.style.display = 'none';

    setTimeout(() => Toast.success('Bem-vindo ao Caderno Digital v2.1! 📚'), 500);
    console.log('✅ Caderno Digital com IA v2.1.0 - Pronto!');
});

window.CadernoApp = { Toast, Theme, Stats, Cadernos, IA, Voz, PDF, WhatsApp, Highlight, Atalhos, Formatacao, BuscarSubstituir, ContadorDetalhado, Cache, Privacidade };
