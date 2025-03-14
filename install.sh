#!/bin/bash

# Ollama installieren
curl -fsSL https://ollama.com/install.sh | sh

# Ollama ausführen (im Hintergrund)
ollama serve &

# Node.js installieren (mit nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
export NVM_DIR="$([$(command -v zsh) = '/bin/zsh' ] && echo '$HOME/.nvm' || echo '~/.nvm')"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
nvm install --lts

# server.js mit Node.js ausführen
node server.js