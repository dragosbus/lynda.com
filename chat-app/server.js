const express = require('express');
const path = require('path');
const app = express();

const messages = [{
    name: 'dragos',
    message: 'hello'
},{
    name:'mihail',
    message: 'hi'
}];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/messages', (req,res)=>{
    if(messages.length) {
        res.status(200).json(messages);
    } else {
        res.status(404).send({error: 'Not messages avaible'});
    }
});

app.listen(3000, ()=>{
    console.log('Listen on 3000');
});