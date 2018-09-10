const express = require("express");
const reload = require('reload');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('port', process.env.PORT || 3000);

app.use(express.static('./public'));
app.use(require('./routes/users'));
app.use(require('./routes/feedback'));
app.use(require('./routes/chat'));

io.on('connection', (socket)=>{
    console.log('User connected');
    socket.on('chat', (msg)=>{
        console.log(msg);
        io.emit(msg);
    });
});

http.listen(app.get('port'), () => {
    console.log(`Listen on port ${app.get('port')}`);
});

reload(app);