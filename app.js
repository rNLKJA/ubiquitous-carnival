// obtain required APIs
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

// construct app
const app = express()
const mongoose = require('mongoose')

require('./models/database')

// start app
app.get('/', (req, res) => {
	console.log('Hey, there is an access request !!! ')
	res.send('<p>The server is currently listening on port 4399</p>\
				<iframe src="https://giphy.com/embed/fWj2TR9mfYJ56" width="480"\
				 height="264" frameBorder="0" class="giphy-embed" allowFullScreen>\
				 </iframe><p hidden><a href="https://giphy.com/gifs/supernatural-yes\
				 -dean-winchester-fWj2TR9mfYJ56">via GIPHY</a></p>')
})


// TODO: remove testing module
const contact_router = require('./routes/contact_router.js')
app.use('/contact', contact_router)


// handling invalid links
app.all('*', (req, res) => { // 'default' route to catch user errors
	res.status(404).send()
})

app.listen(process.env.PORT || 3000, () => {
	console.log(`the team 4399's server is listening at PORT: ${process.env.PORT}`)
})