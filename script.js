const chatBox = document.getElementById('chat-box');

// Load previous chat history if it exists
window.onload = () => {
    if (localStorage.getItem('chatHistory')) {
        chatBox.innerHTML = localStorage.getItem('chatHistory');
    }
};

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;

    // Display the user's message
    const userMessage = `<p><strong>You:</strong> ${userInput}</p>`;
    chatBox.innerHTML += userMessage;

    // Save to local storage
    localStorage.setItem('chatHistory', chatBox.innerHTML);

    document.getElementById('user-input').value = '';

    // Send the message to OpenAI Custom GPT
    const response = await fetch("https://chatgpt.com/g/g-681df0f3081c819184ea59cd4ba2e2ae-college-prediction-bot", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: userInput,
            max_tokens: 150,
            temperature: 0.5
        })
    });

    // Get the bot's response
    const data = await response.json();
    const botResponse = `<p><strong>Bot:</strong> ${data.choices[0].text}</p>`;

    // Display the bot's response
    chatBox.innerHTML += botResponse;

    // Save the updated chat to local storage
    localStorage.setItem('chatHistory', chatBox.innerHTML);

    chatBox.scrollTop = chatBox.scrollHeight;
}
