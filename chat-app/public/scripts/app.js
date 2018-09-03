const Main = (function() {
    let form, nameInput, messagesDiv;
    const nameColors = ['rgb(12, 90, 206)', 'rgb(82, 16, 168)', 'rgb(179, 3, 149)', 'rgb(31, 190, 58)'];
    
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
        const randomColorIndex = Math.floor(Math.random() * nameColors.length);
        
        const children = `<div class="msg">
            <h4 style="color: ${nameColors[randomColorIndex]}">${msg.name}</h4>
            <p>${msg.message}</p>
        </div>`;

        return children;
    };

    return {init};
})();

Main.init();