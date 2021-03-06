const Main = (function () {
    let form, nameInput, messagesDiv, messageInput;
    const nameColors = ['rgb(12, 90, 206)', 'rgb(82, 16, 168)', 'rgb(179, 3, 149)', 'rgb(31, 190, 58)'];

    const init = () => {
        form = document.getElementById('form');
        nameInput = document.getElementById('name');
        messagesDiv = document.getElementById('messages');
        messageInput = document.querySelector('#form input');

        form.addEventListener('submit', e => {
            e.preventDefault();
            fetch('http://192.168.0.104:3000', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: nameInput.value,
                        message: messageInput.value
                    })
                }).then(res => res.json())
                .then(data => {
                    console.log(data);
                })
                .catch(err => alert(err));
        });

        fetchMessages();
        socketIo();
    };

    const addMessage = msg => {
        const randomColorIndex = Math.floor(Math.random() * nameColors.length);

        const children = `<div class="msg">
            <h4 style="color: ${nameColors[randomColorIndex]}">${msg.name}</h4>
            <p>${msg.message}</p>
        </div>`;

        return children;
    };

    const fetchMessages = () => {
        fetch('http://192.168.0.104:3000/messages')
            .then(res => res.json())
            .then(data => {
                data.forEach(msg => {
                    messagesDiv.innerHTML += addMessage(msg)
                });
            });
    };

    const socketIo = () => {
        let socket = io();
        socket.on('message', data => {
            console.log(data);
            messagesDiv.innerHTML += addMessage(data);
        });
    }

    return {
        init
    };
})();

Main.init();