# tts-conversation-stt-nodejs
Uma aplicação NodeJS simples para exemplificar o uso da biblioteca de Watson Speech to Text, Conversation e Text to Speech.

# Instalação e configuração

## Clone e instale as dependencias
```
git clone https://github.com/hackatruck/stt-conversation-tts-nodejs.git
cd stt-conversation-tts-nodejs
npm install
```

## Configure as credenciais do serviço Watson Conversation

1. Acesse [bluemix.net](bluemix.net)
2. Crie uma instância do serviço Watson Text To Speech
3. Crie uma instância do serviço Watson Conversation
4. Crie uma instância do serviço Watson Speech to Text
5. Copie as credenciais dos serviços (username e password) para o arquivo config.js

## Crie um novo workspace

1. Acesse o editor do serviço conversation em [https://www.ibmwatsonconversation.com](https://www.ibmwatsonconversation.com)
2. Crie um novo workspace ou importe o workspace de exemplo no arquivo workspace.json
3. Copie o workspace_id para o arquivo config.js

# Execute a aplicação
Execute a aplicação com o comando

    node app.js
