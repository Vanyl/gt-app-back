const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
const port = 3000

app.use(bodyParser.json())

app.use(cors());

var Users = [
    {
        name: 'test',
        email: 'test@test.com',
        password: '123'
    }
];

app.post('/api/register', function (req, res) {
    console.log('Received data:', req.body);
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status("400");
        res.send("Invalid details!");
    } else {
        Users.filter(function (user) {
            if (user.email === req.body.email) {
                res.status(409).json({ message: "User Already Exists! Login or register with another email" });
            }
        });
        var newUser = { name: req.body.name, email: req.body.email, password: req.body.password };
        Users.push(newUser);
        res.status(201).json({ message: "User registered successfully! Please login" });
    }
})


app.get('/api/users', function (req, res) {
    res.send(Users);
})

app.post('/api/login', function (req, res) {
    console.log('Received data:', req.body);
    console.log('Users :');
    console.log(Users)

    if (!req.body.email || !req.body.password) {
        res.status(400).json({ message: "Please enter both email and password to log in" });
    } else {
        const user = Users.find((user) => user.email === req.body.email && user.password === req.body.password);

        if (user) {
            res.status(200).json({ message: "Login successful", name: user.name });
        } else {
            res.status(401).json({ error: "Invalid credentials!" });
        }

    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})