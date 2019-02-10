//Bringing in all the dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose')
const config = require('./config/database');

//Connecting to the database
mongoose.connect(config.database);

//Checking the connection
mongoose.connection.on('connected', ()=>{
    console.log("Connceted to the database" + config.database);
});

//Checking the connection
mongoose.connection.on('error', (err)=>{
    console.log("ERROR: " + err);
});


//Init app with express
const app = express();

const users = require('./routes/users');

//CORS (for domains) --Refer help_for_modules.txt
app.use(cors());

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser   --Refer help_for_modules.txt
app.use(bodyParser.json());

app.use('/users', users);

//port for your server
const port = 3000;

//route
app.get('/', (req, res)=> {
    res.send('invalid endpoint');
});

//Starting the server
app.listen(port, () => {
    console.log('Server started ' + port);
});

