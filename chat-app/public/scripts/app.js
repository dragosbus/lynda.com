const Main = (function() {
    let form, nameInput, messagesDiv;
    
    const init = () => {
        form = document.getElementById('form');
        nameInput = document.querySelector('#form input');
        messagesDiv = document.getElementById('messages');

        form.addEventListener('submit', e=>{
            e.preventDefault();
            messagesDiv.innerHTML += addMessage({
                name:'dragos',
                message: 'Hello'
            })
        });
    };

    const addMessage = msg => {
        const children = `<div>
            <h4>${msg.name}</h4>
            <p>${msg.message}</p>
        </div>`;

        return children;
    };

    return {init};
})();

Main.init();