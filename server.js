const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/artists', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', (error) => console.log('Connected to Database'))

app.use(express.json())

app.listen(3000, () => console.log("Server Started"))