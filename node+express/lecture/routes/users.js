const express = require('express');
const router = express.Router();
const data = require('../data.json');

router.get('/users', (req, res) => {
    let render = '';
    data.forEach(user => {
        render += `<li>
            <p>${user.name}</p>
            <p>${user.age}</p>
        </li>`
    });
    res.status(200).send(render);
});

router.get('/user/:id', (req, res) => {
    let user = data[+(req.params.id) - 1];

    if (user) {
        res.status(200).send({
            user
        });
    } else {
        res.status(404).send({
            "error": "User not exist"
        })
    }
});

module.exports = router;