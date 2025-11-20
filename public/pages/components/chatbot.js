// js/chatbot.js

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('chatbot-toggle');
    const closeButton = document.getElementById('chatbot-close');
    const chatbotWindow = document.getElementById('chatbot-window');
    const messagesContainer = document.getElementById('chatbot-messages');
    const inputField = document.getElementById('chatbot-input');
    const sendButton = document.getElementById('chatbot-send');

    // Estado inicial del chatbot
    chatbotWindow.classList.add('hidden');

    // --- Funciones del DOM ---

    toggleButton.addEventListener('click', () => {
        chatbotWindow.classList.toggle('hidden');

        if (!chatbotWindow.classList.contains('hidden')) {
            if (messagesContainer.children.length === 0) {
                appendMessage('bot', '¡Hola! Soy tu asistente de INDEPENDIENTE. ¿En qué puedo ayudarte?');
            }
            inputField.focus();
        }
    });

    closeButton.addEventListener('click', () => {
        chatbotWindow.classList.add('hidden');
    });

    function appendMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);

        // Procesamiento de negritas
        const processedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        messageDiv.innerHTML = processedText;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // --- Base de conocimiento (Optimizada) ---

    const knowledgeBase = [

        // 0. MANEJO DE INSULTOS
        // CAMBIO: Limpiado de duplicados y palabras que no deberían activar insultos ("madre", "vieja", etc.)
        {
            keywords: [
                'salame','retardado','nigga','conchuda','conchudo','sexo','pitito','conchita',
                'chota','choto','cogida','cogido','salamin','boludito','trolo','trola','gay',
                'lesbiana','homosexual','travesti','traba','esclavo','gordo','gorda','teton',
                'vaca','cojo','coger','garchar','violador','violadora','pelotudo','mogolico',
                'autista','retrasado','idiota','mierda','puta','puto','imbecil','cabron','pendejo',
                'gilipollas','orto','semen','culo','pito','pene','vagina','concha','estupido'
            ],
            response: 'Preferiría que mantengamos una conversación sin insultos. ¿En qué puedo ayudarte?'
        },

        // 1. SALUDOS
        {
            keywords: [
                'hola','que onda','buenas','hello','hey','holis','ola','olis','saludo','que tal'
            ],
            response: '¡Hola!, soy tu asistente virtual. ¿Tienes algo para preguntarme?'
        },

        {
            keywords: ['gracias','adios','chau','hasta luego'],
            response: '¡Espero haberte ayudado! ¡Que tengas un gran día!'
        },

        // 2. ASOCIACIÓN
        {
            keywords: ['socio','asociarme','asociarse','registro','iniciar sesion','inicio de sesion'],
            response: 'Para **Asociarte al club**, haz clic en "Asociate" en la esquina superior derecha, completa tus datos, elegí un método de pago y quedás asociado.'
        },

        // ⚠ CAMBIO: acá corregí "keyword → keywords" (error original)
        {
            keywords: [
                'de que sirve asociarse','para que sirve asociarse','de que me sirve asociarme',
                'porque asociarme','porque deberia asociarme'
            ],
            response: 'Asociarte te permite acceder a actividades del club, descuentos, sorteos, beneficios especiales y compras financiadas como socio.'
        },

        // 3. NOTICIAS
        {
            keywords: ['noticias','noticias principales','más noticias'],
            response: 'Las **noticias principales** están arriba de todo en la sección principal. Las demás están en el apartado "Más Noticias".'
        },

        // 4. COMPONENTES DE LA WEB
        {
            keywords: ['header','encabezado','barra superior'],
            response: 'El encabezado contiene el escudo, sponsors, botones de "entradas digitales", "asociate" y redes sociales.'
        },

        {
            keywords: ['footer','pie de pagina','fondo'],
            response: 'El pie de página incluye el mail del club, la sede, enlaces y el aviso de copyright.'
        },

        {
            keywords: ['facebook','twitter','instagram','redes'],
            response: 'Puedes seguirnos en Facebook, X (Twitter), Instagram y Youtube. Los enlaces están en el **encabezado**.'
        },

        {
            keywords: ['usuario','login','sesion'],
            response: '¿Problemas para iniciar sesión? Recuperá tu contraseña desde "Sede Digital" o contactanos.'
        },

        {
            keywords: ['como contribuir','colaborar','trabajar'],
            response: 'El proyecto web es cerrado, por lo que no aceptamos contribuciones externas por ahora.'
        },

        {
            keywords: ['error','bug','falla'],
            response: 'Si encontrás un error, por favor envianos un mail desde el contacto en el pie de página.'
        },

        // 5. COPAS
        {
            keywords: ['copas','copas internacionales','copas nacionales','titulos'],
            response: 'Independiente posee 18 títulos internacionales y 14 títulos nacionales. ¿Sobre qué copa querés saber más?'
        },

        {
            keywords: ['libertadores'],
            response: 'Independiente es el máximo campeón de la Libertadores con 7 títulos. Bicampeón en 1964-65, tetracampeón 1972-75 y campeón en 1984.'
        },

        {
            keywords: ['copa sudamericana'],
            response: 'Independiente ganó la Copa Sudamericana en 2010 y 2017.'
        },

        {
            keywords: ['supercopa sudamericana'],
            response: 'Independiente fue bicampeón de la Supercopa Sudamericana (1994 y 1995).'
        },

        {
            keywords: ['copa intercontinental'],
            response: 'Independiente ganó la Copa Intercontinental en 1973 y 1984.'
        }
    ];

    // --- Lógica del chatbot ---

    function getBotResponse(userInput) {
    const cleanedInput = userInput.toLowerCase().trim();
    let responses = [];

    for (const item of knowledgeBase) {
        for (const keyword of item.keywords) {
            if (cleanedInput.includes(keyword)) {
                responses.push(item.response);
                break; // evita repetir la misma categoría varias veces
            }
        }
    }

    if (responses.length === 0) {
        return "Disculpa, no entendí tu pregunta. Intenta reformularla.";
    }

    // Une todas las respuestas en un solo mensaje
    return responses.join("<br><br>");
}


    function handleSendMessage() {
        const userInput = inputField.value.trim();
        if (userInput === '') return;

        appendMessage('user', userInput);

        const botResponse = getBotResponse(userInput);
        setTimeout(() => {
            appendMessage('bot', botResponse);
        }, 500);

        inputField.value = '';
    }

    sendButton.addEventListener('click', handleSendMessage);

    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });

});
