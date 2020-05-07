'use strict'
const dotenv = require("dotenv")
dotenv.config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const noCache = require('nocache')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const fileStoreOptions = {}
const startedDate = new Date()
const mongoose = require('mongoose')

const KEY_SESSION = require('crypto').randomBytes(1024).toString('hex')

mongoose.connect(
    `mongodb://mongodb:27017/${process.env.MONGODB_DATABASE}?authSource=${process.env.MONGODB_DATABASE}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: process.env.MONGODB_USERNAME,
        pass: process.env.MONGODB_PASSWORD
    }
)
    .then(() => {
        console.log(`DB CONNECTION OK`)
    })
    .catch((e) => {
        console.error(e)
        console.log(`DB CONNECTION FAIL`)
    })


/**MIDDLEWARE */
app.use(helmet())
app.use(noCache())
app.use(cors())
app.use(bodyParser.json({ limit: "10mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }))

app.use(
    session({
        store: new FileStore(fileStoreOptions),
        secret: KEY_SESSION,
        resave: true,
        saveUninitialized: true
    })
)


app.use(morgan('dev'))

/** ROUTER */
app.get('/', (req, res) => {
    res.status(201).json({message:"welcome"})
})


app.listen(process.env.PORT, () => {
    console.log(`SERVER STARTED`)
    console.log(`TIME: ${startedDate}`);
    console.log(
        `URL: http://${process.env.HOST}:${process.env.PORT}/`
    )
})