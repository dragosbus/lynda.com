const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

const db = 'mongodb://localhost/chat-app';

const messages = [];

const Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.use(express.static(path.join(__dirname, 'public')));

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.status(200).json(messages);
    });
});

app.post('/', (req, res) => {
    const message = new Message(req.body);
    message.save()
        .then(() => {
            return Message.findOne({
                message: 'bad'
            })
        })
        .then(censored => {
            if (censored) {
                return Message.deleteOne({
                    _id: censored.id
                });
            }
            res.status(200).json(message);
            io.emit('message', req.body);
        })
        .catch(err => {
            res.status(404).send(err);
        })
});

io.on('connection', socket => {
    console.log('socket connection');
});

mongoose.connect(db, err => {
    console.log('db conn');
});

http.listen(3000, () => {
    console.log('Listen on 3000');
});