// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// modules
const pool = require('./modules/pool');

// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// globals
const port = 5000;

// spin up server
app.listen(port, () => {
    console.log('server is up on:', port);
})

// routes
app.get('/tasks', (req, res) => {
    console.log('tasklist GET hit');
    res.send('moo');
})