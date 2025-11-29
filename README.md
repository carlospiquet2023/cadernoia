# 📚 Caderno Digital com IA 2.0

<div align="center">

![Version](https://img.shields.io/badge/versão-2.0.0-blue)
![License](https://img.shields.io/badge/licença-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![Electron](https://img.shields.io/badge/electron-39.x-blue)

**Um caderno digital moderno e inteligente com integração de IA para continuar seus textos automaticamente.**

[🚀 Demo](#demo) • [📦 Instalação](#instalação) • [⌨️ Atalhos](#atalhos) • [🤖 IA](#configuração-da-ia)

</div>

---

## ✨ Recursos

### 🎨 Interface Premium
- **Dark/Light Mode** - Alterne entre temas com `Ctrl+D`
- **Design Glassmorphism** - Visual moderno com efeitos de vidro
- **Animações Suaves** - Transições fluidas em toda a interface
- **100% Responsivo** - Funciona em desktop, tablet e mobile

### 📝 Edição Avançada
- **Múltiplos Cadernos** - Organize suas anotações
- **20 Páginas por Caderno** - Navegação fácil
- **6 Fontes Manuscritas** - Kalam, Patrick Hand, Dancing Script, etc.
- **5 Cores de Caneta** - Preto, Azul, Vermelho, Verde, Roxo
- **Marcadores Coloridos** - Destaque textos em amarelo, azul ou verde
- **Auto-Save** - Nunca perca seu trabalho

### 🤖 Inteligência Artificial
- **Continuação de Texto** - A IA continua seu texto mantendo o contexto
- **Modelo Llama 3.1** - IA de última geração via Groq
- **Barra de Progresso** - Feedback visual durante processamento

### 🎤 Ditado por Voz
- **Reconhecimento de Voz** - Dite suas anotações
- **Suporte a Português BR** - Reconhecimento nativo
- **Indicador Visual** - Botão pulsa enquanto grava

### 📤 Exportação
- **PDF** - Exporte páginas em alta qualidade
- **WhatsApp** - Compartilhe resumos diretamente

### ⌨️ Atalhos de Teclado
| Atalho | Ação |
|--------|------|
| `Ctrl+S` | Salvar |
| `Ctrl+I` | Continuar com IA |
| `Ctrl+P` | Exportar PDF |
| `Ctrl+D` | Alternar tema |
| `Ctrl+N` | Novo caderno |
| `PageUp` | Página anterior |
| `PageDown` | Próxima página |
| `F1` | Mostrar atalhos |

---

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/carlospiquet2023/cadernodigital.git
cd cadernodigital
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o ambiente**
```bash
cp .env.example .env
# Edite .env e adicione sua GROQ_API_KEY
```

4. **Inicie o servidor**
```bash
npm start
```

5. **Acesse no navegador**
```
http://localhost:3000
```

### Modo Electron (Desktop)
```bash
npm run electron
```

---

## 🤖 Configuração da IA

Para usar a funcionalidade de IA, você precisa de uma chave da API Groq:

1. Acesse [console.groq.com](https://console.groq.com)
2. Crie uma conta gratuita
3. Gere uma API Key
4. Adicione no arquivo `.env`:
```env
GROQ_API_KEY=sua_chave_aqui
```

### Modelos Disponíveis
| Modelo | Descrição |
|--------|-----------|
| `llama-3.1-70b-versatile` | Melhor qualidade (padrão) |
| `llama-3.1-8b-instant` | Mais rápido |
| `mixtral-8x7b-32768` | Contexto longo |

---

## 🏗️ Arquitetura

```
caderno_simp/
├── index.html          # Página principal
├── manifest.json       # PWA manifest
├── server.js           # Servidor Express
├── main.js             # Electron main process
├── package.json        # Dependências
├── .env.example        # Exemplo de configuração
├── css/
│   └── style.css       # Estilos premium
├── js/
│   └── app.js          # Lógica da aplicação
└── installer/
    └── installer.iss   # Inno Setup script
```

---

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript ES6+, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Desktop**: Electron
- **IA**: Groq API (Llama 3.1)
- **APIs Web**: Web Speech API, LocalStorage

---

## 📱 PWA

O Caderno Digital pode ser instalado como um aplicativo:

1. Acesse `http://localhost:3000`
2. Clique no ícone de instalação no navegador
3. Pronto! Use como um app nativo

---

## 🧪 Desenvolvimento

```bash
# Modo desenvolvimento com hot reload
npm run dev

# Build para produção
npm run dist

# Criar instalador Windows
npm run build:win
```

---

## 📄 Licença

MIT © 2025 [Carlos Antonio de Oliveira Piquet](https://github.com/carlospiquet2023)

---

## 👨‍💻 Autor

**Carlos Antonio de Oliveira Piquet**
- 📧 Email: carlospiquet.projetos@gmail.com
- 🐙 GitHub: [@carlospiquet2023](https://github.com/carlospiquet2023)
- 💼 Especialista em Inteligência Artificial e Redes de Computadores

---

<div align="center">

**⭐ Se este projeto te ajudou, deixe uma estrela!**

</div>
