const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
var jsonParser = bodyParser.json();

app.use((req, res, next) => {
    res.setHeader("Content-Type", "text/html");
    res.append('Access-Control-Allow-Origin', ['*']);
    res.header("Access-Control-Allow-Headers","*")
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Routes
const usersRoutes = require('./src/routes/users');
const tasksRoutes = require('./src/routes/tasks');

//app.use(bodyParser.json());
//app.use(express.json());

app.use('/users', jsonParser, usersRoutes);
app.use('/tasks', jsonParser, tasksRoutes);

app.use("/", (req, res) => {
    res.status(404).send({ status: false, message: 'Page not found.' });
})

app.listen(4000);