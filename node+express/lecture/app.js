const express = require("express");
const reload = require('reload');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static('./public'));
app.use(require('./routes/users'));
app.use(require('./routes/feedback'));

app.listen(app.get('port'), () => {
    console.log(`Listen on port ${app.get('port')}`);
});

reload(app);