// obtain required APIs
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
//const cors = require('cors');

// construct app
const app = express()
const mongoose = require('mongoose')

require('./models/database')

// allow the post,get request from other domain
/*
app.use(cors({
	origin: ['http://localhost:3000']
}));
*/

// router for testing
// allow the post,get request from other domain
const profileRouter = require('./routes/profileRouter')
app.use(express.json())
app.use('/test', profileRouter)

// handling invalid links
app.all('*', (req, res) => { // 'default' route to catch user errors
	res.status(404).send()
})

app.listen(process.env.PORT || 3000, () => {
	console.log(`the team 4399's server is listening at PORT: ${process.env.PORT}`)
})