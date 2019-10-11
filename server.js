const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;
const DBURI = `mongodb://34.241.102.37:27017/todos`;
const DB = mongoose.connection;
const allTodos = require('./routes/allTodos');
const singleTodo = require('./routes/singleTodo');
const addTodo = require('./routes/addTodo');

// This code deals with the CORS issue
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/add', addTodo);
app.use('/todo', singleTodo);
app.use('/', allTodos);

mongoose.connect(DBURI, { useNewUrlParser: true }, error => {
    error ? console.log(`Unable to connect to DB due to: ${error}`) : console.log(`Connection to MongoDB successful`);
});


app.get(`/`, (req, res) => {
    res.send(`Hello World`);
});

const server = app.listen(PORT, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`Server is running on http://${SERVERHOST}:${SERVERPORT}`);
});

module.exports = server;