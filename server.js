const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    //Initialze express in app
    app = express()

const json = require('./data.json')

const members = require('./Members')

//Set public as our static folder
app.use(express.static(path.join(__dirname, 'public')))

//Handle raw JSON
app.use(express.json())
// Handle URL encoded data
app.use(express.urlencoded({ extended: false }))

//Route handler
app.get('/', (req, res) => {
    res.send({hey: "buddy"})
})

// Works like an api endpoint
app.get('/api/members', (req, res) => {
    res.json(members)
})


app.post('/api/members', (req, res) => {
    let num = Math.floor(Math.random(0, 1) * 1024)
    const newMember = {
        id: num,
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
/*
    if(!newMember.name || !newMember.email){
       return res.status(400).json({ msg: 'Please include!!! both email and Name!!!'})
    } */

    members.push(newMember)
    res.json(members)
})

// How to serve html files in different routes
// res.sendFile(path.join(__dirname + '{ path to html file to be served }'))
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/about.html'))
})

//* Första delen i VG
app.get('/api/random', (req, res) => {
    let num = Math.floor(Math.random(0, 1) * 1024)
    res.send({number: num})
})

//* Andra delen i VG
app.get('/api/custom_random/:num', (req, res) => {
    let num = Math.floor(Math.random(0, 1) * req.params.num)
    res.send({number: num})
    console.log(num)
})

//Tells express which port to listen to, either the environement variables port or port 3000 if env port does not exist
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started succefully on port ${PORT}`));


/*
LINKS:
https://expressjs.com/
https://expressjs.com/en/starter/hello-world.html
https://www.youtube.com/watch?v=L72fhGm1tfE&ab_channel=TraversyMedia
https://stackoverflow.com/questions/40556650/generate-random-number-with-node-js-page
*/