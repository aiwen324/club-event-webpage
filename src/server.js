/* server.js - user & resource authentication */
'use strict';
const log = console.log

const express = require('express')

const app = express();

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')
mongoose.set('useFindAndModify', false); 

const { Announcement } = require('./models/Announcement')
const { Users } = require('./models/users')

// to validate object IDs
const { ObjectID } = require('mongodb')

// handlebars templating engine
const hbs = require('hbs')
// Set express property 'view engine' to be 'hbs'
app.set('view engine', 'hbs')
// setting up partials directory
hbs.registerPartials(__dirname + '/views/partials')


// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())

// express-session for managing user sessions
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: '#66CCFF',
    resave: false,
    cookie:{
        expires: 10000,
        httppOnly: true
    }
    
}))

const validatelogin = (req, res, next)=>{
    if(!req.session.Users){
        res.redirct('/login/')
    }else{
        next()
    }
}

// API used to login, request json should be formated like:
/*  {
//      username: <username>,
//      password: <password>
//  }
*/
// This method will return a json as follow if login is a sucess:
/* 
 {
    userID:         <userid (number)>
    email:          <email (String)>
    username:       <username (String)>
    accountType:    <type   (Number)>
}
*/
// If the login failed, it wil return a status code of 400
app.post('/Login', (req, res)=>{
    const username = req.body.email
    const password = req.body.password

    Users.findOne({username, password}).then((result)=>{
        if(!result){
            res.status(400).send()
        }
        const returnJson = {
            userID: result._id,
            email: result.email,
            username: result.username,
            accountType:result.accountType,
        }
        req.session.userID = result._id
        req.session.type= result.accountType
        
        res.status(200).json(returnJson)
        
    }, (error)=>{
        res.status(500).send(error)
    })
})


// API for adding new users to server, expecting a json format like this:
/*
    {
        accountType: <type (1 or 0)>
        username:    <name (String)>
        email:       <email (String)>
        password:    <passwoed (String)>
        phoneNumber: <phoneNum (String)>
    }
*/
// Upon sucess, response have a status code of 200
// Upon Failure, reponsecode is 500 and error detail will be send
app.post('/signUp', (req, res)=>{
    const newUser = new Users({
        accountType: req.body.accountType,
        username: req.body.username,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber
    })
    newUser.save().then((result)=>(
        res.status(200).send()
    ), (error)=>{
        res.status(500).send(error)
    })
})

// This API is for getting all the visable announcement from the server
app.get('/visableAnnouncements',(req, res)=>{
    //work in progress
})
