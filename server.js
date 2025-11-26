require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint for continuing text
app.post('/api/continue-text', async (req, res) => {
    const { text } = req.body;

    if (!text || !text.trim()) {
        return res.status(400).json({ error: 'Texto é obrigatório' });
    }

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "openai/gpt-oss-20b",
                messages: [
                    {
                        role: "system",
                        content: "Continue o texto fornecido de forma natural, coerente e criativa, mantendo o estilo e o tom original."
                    },
                    { role: "user", content: text }
                ],
                temperature: 0.5,
                max_tokens: 800
            })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        if (!data.choices || !data.choices[0]) {
            return res.status(500).json({ error: 'Resposta inesperada da API' });
        }

        res.json({ continuation: data.choices[0].message.content });
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Serve static files (HTML, JS, etc.)
app.use(express.static('.'));

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});