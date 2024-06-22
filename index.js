const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
const port = 3000

app.use(bodyParser.json())

app.use(cors());

var Users = [
    {
        email: 'test@test.com',
        password: '123'
    }
];

app.get('/api/login', function (req, res) {
    res.render('login');
});

app.post('/api/login', function (req, res) {
    console.log('Received data:', req.body);
    console.log('Users :');
    console.log( Users)
    if (!req.body.email || !req.body.password) {
        res.status(400).json({ message: "Please enter both email and password" });
    } else {
        if (Users[0].email === req.body.email && Users[0].password === req.body.password) {
            res.sendStatus(200);
        }
        res.status(401).json({ message: "Invalid credentials!" });
    }
});

app.get('/hello', (req, res) => {
    console.log('aloha')
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})