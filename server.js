const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    //Initialze express in app
    app = express(),
    pool = require('./data/config');
    mysql = require('mysql')


const json = require('./data.json')
let counterNum = 0;
const members = require('./Members')




//Set public as our static folder
app.use(express.static(path.join(__dirname, 'public')))
//Handle raw JSON
app.use(express.json())
// Handle URL encoded data
app.use(express.urlencoded({ extended: false }))

// Display all users
app.get('/users', (req, res) => {
    pool.query('SELECT * FROM users', (error, result) => {
        if (error) throw error;

        res.send(result);
    });
});

// Displays a single user based in id
app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
        if(error) throw error;

        res.send(result)
    })
})

//Route handler
app.get('/', (req, res) => {
    res.send({hey: "buddy"})
})

// Add a new user
app.post('/user', (req, res) => {
    const id = Date.now()
    const user = {...req.body, id: id}
    pool.query('INSERT INTO users SET ?', user, (err, result) => {
        if(err) throw err;

        res.status(201).send({message: `User ${req.body.firstName} added with ID: ${id}`});
    })
});

// Update a user
app.put('/user/:id', (req, res) => {
    const id = req.params.id;

    pool.query('UPDATE users SET ? WHERE id = ?', [req.body, id], (error, result) => {
        if (error) throw error;

        res.send({message: `User with ID: ${id} was sucessfully updated`})
    })
})

// Delete a user
app.delete('/user/:id', (req, res) => {
    const id = req.params.id;

    pool.query('DELETE FROM users WHERE id = ?', id, (err, result) => {
        if(err) throw err;

        res.send({message: `User with ID: ${id} was sucessfully deleted`})
    })
})

app.post('/api/members', (req, res) => {
    //let num = Math.floor(Math.random(0, 1) * 1024)
    const newMember = {
        id: Date.now(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    members.push(newMember)
    res.json(members)

})

// How to serve html files in different routes
// res.sendFile(path.join(__dirname + '{ path to html file to be served }'))
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/about.html'))
})

app.get('/api/random', (req, res) => {
    let num = Math.floor(Math.random(0, 1) * 1024)
    res.send({number: num})

})


app.get('/api/custom_random/:num', (req, res) => {
    let num = Math.floor(Math.random(0, 1) * req.params.num)
    res.send({number: num})
    console.log(num)
})

app.get('/api/counter', (req, res) => {
    res.send({num: counterNum})
})
app.get('/api/counter/add', (req, res) => {
    counterNum++;
    res.send({num: counterNum})
})

//*Fanns inte innan testet skrevs
app.get('/api/counter/addTwo', (req, res) => {
    counterNum += 2;
    res.send({num: counterNum})
})

//*Fanns inte innan testet skrevs
app.get('/api/counter/double', (req, res) => {
    counterNum *= 2;
    res.send({num: counterNum})
})

//Tells express which port to listen to, either the environement variables port or port 3000 if env port does not exist
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started succefully on port: http://localhost:${PORT}`));

module.exports = app;   //For testning
