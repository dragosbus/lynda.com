const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded())

const messages = [{
    name: 'dragos',
    message: 'hello'
}, {
    name: 'mihail',
    message: 'hi'
}];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/messages', (req, res) => {
    if (messages.length) {
        res.status(200).json(messages);
    } else {
        res.status(404).send({
            error: 'Not messages avaible'
        });
    }
});

app.post('/', (req, res) => {
    const {
        name,
        message
    } = req.body;
    if (!name || !message) {
        res.status(404).send({
            error: 'Must type the name or the message'
        });
    } else {
        messages.push({
            name,
            message
        });
        res.status(200).json(messages);
    }
});

app.listen(3000, () => {
    console.log('Listen on 3000');
});