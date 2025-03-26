async function getBotResponse(userMessage) {
    const apiUrl = 'http://localhost:3000/send-message'; // Local server URL

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: userMessage
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const botMessage = data.response; // Adjust according to your server response

        const botMessageContainer = document.createElement('div');
        botMessageContainer.classList.add('message', 'bot-message');
        botMessageContainer.textContent = botMessage;
        document.getElementById('chatbot-messages').appendChild(botMessageContainer);
    } catch (error) {
        console.error('Error fetching bot response:', error);
        const errorMessageContainer = document.createElement('div');
        errorMessageContainer.classList.add('message', 'error-message');
        errorMessageContainer.textContent = 'Sorry, there was an error getting the response.';
        document.getElementById('chatbot-messages').appendChild(errorMessageContainer);
    }
}

function sendMessage(event) {
    if (event.type === 'keypress' && event.key !== 'Enter') {
        return;
    }

    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value.trim();

    if (userMessage === '') {
        return;
    }

    const userMessageContainer = document.createElement('div');
    userMessageContainer.classList.add('message', 'user-message');
    userMessageContainer.textContent = userMessage;
    document.getElementById('chatbot-messages').appendChild(userMessageContainer);
    userInput.value = '';

    setTimeout(() => {
        // Show loading GIF
        const loadingMessageContainer = document.createElement('div');
        loadingMessageContainer.classList.add('message', 'bot-message');
        const loadingGif = document.createElement('img');
        loadingGif.src = 'img/loading.gif';
        loadingGif.alt = 'Loading...';
        loadingGif.style.height = '50px'; // Set the height to 50px
        loadingMessageContainer.appendChild(loadingGif);
        loadingMessageContainer.style.border = 'none';
        loadingMessageContainer.style.backgroundColor = 'transparent';
        document.getElementById('chatbot-messages').appendChild(loadingMessageContainer);

        getBotResponse(userMessage).then(() => {
            // Remove loading message after bot response is received
            document.getElementById('chatbot-messages').removeChild(loadingMessageContainer);
        });
    }, 200);
}