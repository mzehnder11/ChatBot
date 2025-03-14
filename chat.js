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

    getBotResponse(userMessage);
}