(function () {
    const state = {
        users: []
    }

    const getData = async (url) => {
        let data = await fetch(url).then(res => res.json());

        return data;
    };

    const appendDataToDOM = data => {
        if (!data.length) {
            return `<h1>Empty List</h1>`;
        } else {
            let list = '';
            data.forEach(element => {
                list += `<li class="card">
                    <img src="${element.picture.medium}"/>
                    <h2>${element.name.first} ${element.name.last}</h2>
                    <span>${element.gender}</span>
                    <p>${element.email}</p>
                    <p>${element.cell}</p>
                </li>`
            });

            return `<ul class="list">
                ${list}
            </ul>`
        }
    };

    getData('http://localhost:3000/users')
        .then(data => {
            console.log(data)
            state.users = data;
        })
        .then(() => {
            document.querySelector('main').innerHTML = appendDataToDOM(state.users);
        })
        .catch(err => console.log(err));
})();