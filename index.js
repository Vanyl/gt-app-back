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
                res.send({message: "User Already Exists! Login or register with another email"});
            }
        });
        var newUser = { name: req.body.name, email: req.body.email, password: req.body.password };
        Users.push(newUser);
        res.status(200).json({ message: "User registered successfully!" });
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
           Users.filter(function(user){
        if (user.email === req.body.email && user.password === req.body.password) {
            //  req.session.user = user;
            //  res.redirect('/protected_page');
            res.sendStatus(200);
        }
           });
        res.status(401).json({ message: "Invalid credentials!" });
    }
});

// app.get('/api/logout', function (req, res) {
//     req.session.destroy(function () {
//         console.log("user logged out.")
//     });
//     res.redirect('/login');
// });

app.get('/hello', (req, res) => {
    console.log('aloha')
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})