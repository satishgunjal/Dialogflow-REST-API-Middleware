const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route'); // Imports routes for the users

const PORT = 9000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/GdfRestApi', route);
app.get('/', (req, res) => res.send('Google Dialogflow REST API middleware'))
app.listen(PORT, () => {
    console.log("################## listening on port " + PORT + " ################# **");
});