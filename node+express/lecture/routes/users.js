const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const data = require('../data.json');

express().use(bodyParser.json());
express().use(bodyParser.urlencoded({extended: false}));

router.get('/users', (req, res) => {
    if(data.length) {
        res.status(200).json(data);
    } else {
        res.status(404).json({"error": "Empty list"})
    }
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