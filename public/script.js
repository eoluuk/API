const messagesContainer = document.getElementById('messages');
const sendBtn = document.getElementById('sendBtn');
const userMessage = document.getElementById('userMessage');

// Substitua pela URL do seu Render
const API_URL = "https://seu-projeto.onrender.com/chat";

sendBtn.addEventListener('click', sendMessage);
userMessage.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function sendMessage() {
    const message = userMessage.value.trim();
    if (!message) return;

    appendMessage(message, 'user');
    userMessage.value = '';

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ message })
        });
        const data = await res.json();
        appendMessage(data.reply, 'bot'); // supondo que sua API retorna { reply: "..." }
    } catch (err) {
        appendMessage("Erro ao conectar com a API", 'bot');
        console.error(err);
    }
}
