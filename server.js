const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const moment = require('moment')

const port = process.env.PORT || 5000
const app = express()

// enable files upload **
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//make uploads directory static
app.use(express.static('./public'));

//middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload())

app.get('/', (req, res) => {
	res.send('Hello world')
})

//Get endpoint
app.get('/files', (req, res) => {
	res.json(req.body) //body should give the name and description field, shows an empty object?
	console.log('req.files', req.files)
	//res.json(req.files) //files should give the uploaded file, but shows nothing in Postman
})

//Upload endpoint 
app.post('/upload', (req, res) => {
	try {
		if (req.files === null) {
			return res.status(400).json({ msg: 'No file uploaded' })
		}

		const file = req.files.file
		const fileName = file.name
		const extension = path.extname(fileName)

		const allowedExtensions = /xml|jpeg|jpg|pdf/

		if (!allowedExtensions.test(extension)) throw 'Unsupported file type!'

		//mv = move the file to current dir/client(react)/public
		file.mv(`${__dirname}/client/public/uploads/${file.name}`)

		res.json({
			message: 'File uploaded successfully!',
			fileName: file.name,
			user: req.body,
			description: req.body,
			date: moment().add(10, 'days').calendar(),
			filePath: `/uploads/${file.name}`,
			extension: path.extname(fileName)
		})
	} catch (err) { 	//catch if path doesnt exist
		console.error(err)
		//500 server error
		return res.status(500).send(err)
	}
})

//Delete endpoint
//maybe pass in an id for the spec. file?
//app.delete('/files', (req, res) => {})

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`)
})
