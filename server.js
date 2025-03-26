const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const app = express();
const port = 3000;
let prePromt = "Bitte mache auf die Antwort auf folgende Frage keine Formatierung";

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.post('/send-message', (req, res) => {
    const userMessage = req.body.message;
    console.log(`Received message: ${userMessage}`);

    // Spawn the ollama process
    const ollamaProcess = spawn('ollama', ['run', 'llama3.2']);

    let botResponse = '';

    // Capture the output from the ollama process
    ollamaProcess.stdout.on('data', (data) => {
        botResponse += data.toString();
    });

    // Capture any errors from the ollama process
    ollamaProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    // Handle the end of the ollama process
    ollamaProcess.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).send('Error executing command');
        }
        console.log(`ollama run llama3.2 output: ${botResponse}`);
        res.send({ response: botResponse.trim() });
    });

    // Write the user message to the ollama process
    // ollamaProcess.stdin.write(`${prePromt}":"${userMessage}\n`);
    ollamaProcess.stdin.write(prePromt + ":" + userMessage);
    ollamaProcess.stdin.end();
});

app.post('/install', (req, res) => {
    // Spawn the install.js process
    const installProcess = spawn('node', ['install.js'], { shell: true });

    let installOutput = '';

    // Capture the output from the install.js process
    installProcess.stdout.on('data', (data) => {
        installOutput += data.toString();
    });

    // Capture any errors from the install.js process
    installProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    // Handle the end of the install.js process
    installProcess.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).send('Error executing install script');
        }
        console.log(`install.js output: ${installOutput}`);
        res.send({ response: installOutput.trim() });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});