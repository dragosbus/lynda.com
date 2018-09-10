(function () {
    const form = document.getElementById('form');
    const nameVal = document.getElementById('name');
    const messageVal = document.getElementById('message');
    const chatApp = document.querySelector('.chat');
    const socket = io();

    form.addEventListener('submit', e => {
        e.preventDefault();

        let message = {
            user: nameVal.value,
            message: messageVal.value
        };

        socket.emit('chat', message);
        chatApp.appendChild(createMsg(message));
    });

    const createMsg = msg => {
        let message = document.createElement('div');
        message.classList.add('message');

        let messageHTML = `
            <h2>${msg.user}</h2>
            <p>${msg.message}</p>
        `;

        message.innerHTML += messageHTML;

        return message;
    };

    socket.on('chat', ()=>{
        chatApp.appendChild(createMsg({'message':'1', user:'1'}));
    });
}());