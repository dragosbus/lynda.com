const route = require('express').Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const io = require('socket.io');

route.get('/chat', (req, res) => {
    fs.readFile(path.join(__dirname, '../public/chat.html'), (err, data) => {
        if(err) {
            throw err;
        }
        let html = data.toString();
        res.status(200).send(html);
    });
});

module.exports = route;