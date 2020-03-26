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
