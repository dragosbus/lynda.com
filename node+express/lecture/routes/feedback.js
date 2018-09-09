const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/feedback', (req, res) => {
    fs.readFile(path.join(__dirname, '../public/feedback.html'), (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data.toString());
        }
    });
});

router.post('/feedback', (req, res) => {
    //read feedback json file
    //get the array
    //push in the resulted array new data posted by user
    //write to feedback json file the new array
    let feedbackFileContent;
    fs.readFile(path.join(__dirname, '../public/feedback.json'), (err, data) => {
        if (err) {
            throw err;
        }
        feedbackFileContent = data.toString();
        let feedBackJSON = JSON.parse(feedbackFileContent);

        feedBackJSON.push(req.body);

        fs.writeFile(path.join(__dirname, '../public/feedback.json'), JSON.stringify(feedBackJSON), 'utf-8');
    });
});

module.exports = router;