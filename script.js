const chatBox = document.getElementById('chat-box');
const inputContainer = document.getElementById('input-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

const messages = [
    { text: "Hola, hermosa persona 💖", sender: "sent" },
    { text: "Hola 😊", sender: "received" },
    { text: "¿Sabes qué día es hoy? 🎉", sender: "sent" },
    { text: "¿Hoy? Mmm... 🤔", sender: "received" },
    { text: "Hoy es un día muy especial ✨", sender: "sent" },
    { text: "¿Por qué? 😮", sender: "received" },
    { text: "Porque es el día del amor y la amistad, y quiero decirte algo importante... 💌", sender: "sent" },
    { text: "¿Qué cosa? 😳", sender: "received" },
    { text: "Que eres una persona increíble y me alegra mucho tenerte en mi vida 💕", sender: "sent" },
    { text: "Aww, qué lindo 🥰", sender: "received" },
    { text: "Espero que hoy tengas un día lleno de alegría, sonrisas y mucho cariño 💖", sender: "sent" },
    { text: "Gracias, eso significa mucho para mí 😊💖", sender: "received" },
    { text: "Por cierto... te tengo algo especial 🎁 ¿Aceptas? 😏", sender: "sent" }
];

let index = 0;
let isTyping = false;

function addMessage(text, sender) {
    const message = document.createElement('div');
    message.classList.add('message', sender);
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function simulateTyping() {
    if (index < messages.length) {
        isTyping = true;
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'received', 'typing-indicator');
        typingIndicator.innerHTML = `<span class="typing"></span><span class="typing"></span><span class="typing"></span>`;
        chatBox.appendChild(typingIndicator);
        chatBox.scrollTop = chatBox.scrollHeight;

        setTimeout(() => {
            chatBox.removeChild(typingIndicator);
            addMessage(messages[index].text, messages[index].sender);
            index++;
            isTyping = false;
            if (index === messages.length) {
                showButtons();
            } else {
                simulateTyping();
            }
        }, 2000); // Simula el tiempo de escritura
    }
}

function showButtons() {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.innerHTML = `
        <button class="yes" onclick="handleResponse(true)">Sí</button>
        <button class="no" onclick="handleResponse(false)">No</button>
    `;
    chatBox.appendChild(buttonContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleResponse(response) {
    if (response) {
        addMessage("¡Sí! 💖", "received");

        // Crear el botón de descargar carta
        const downloadButton = document.createElement('button');
        downloadButton.textContent = "Descargar Carta";
        downloadButton.classList.add('download-button');
        downloadButton.onclick = () => {
            // Crear un enlace temporal para descargar el archivo
            const link = document.createElement('a');
            link.href = 'carta2.pdf'; // Ruta al archivo local
            link.download = 'carta.pdf'; // Nombre del archivo descargado
            document.body.appendChild(link);
            link.click(); // Simular clic en el enlace
            document.body.removeChild(link); // Eliminar el enlace después de la descarga
        };
        chatBox.appendChild(downloadButton);
    } else {
        addMessage("No 😢", "received");
        setTimeout(() => {
            window.location.href = "https://www.youtube.com/shorts/w3oIvR5HuGs";
        }, 2000);
    }
}

// Función para crear corazones animados
function createHearts() {
    const heartCount = 50; // Número de corazones
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${Math.random() * 100}vw`; // Posición horizontal aleatoria
        heart.style.animationDelay = `${Math.random() * 2}s`; // Retraso aleatorio
        heart.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`; // Color aleatorio
        document.body.appendChild(heart);
    }
}

createHearts();
simulateTyping();