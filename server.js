const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const path = require('path')
const moment = require('moment')

const port = process.env.PORT || 5050
const app = express()

// enable files upload
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Static = make uploads directory static, meaning = the uploaded files publicly accessible from anywhere.
app.use(express.static('./public'))

//middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/ArchiveForFiles'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const Archive = mongoose.model('Archive', {
  user: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

app.get('/', (req, res) => {
  res.send('Hello world')
})

//Get endpoint
//* Is working!
app.get('/files', async (req, res) => {
  const archive = await Archive.find()
    .sort({ createdAt: 'desc' })
    .limit(5)
    .exec()
  res.json(archive)
})

//res.json(req.body) //? body should give the name and description field, shows an empty object?
//console.log('req.files', req.files) //gives undefined in colsole
//res.json(req.files) //files should give the uploaded file, but shows nothing in Postman
//})

//Upload endpoint
//TODO the uploaded file should preferable end up in like google drive
app.post('/upload', (req, res) => {
  try {
    if (req.files === null) {
      //if there are no file then....
      return res.status(400).json({ msg: 'No file uploaded' })
    }
    //const data = req.body

    //* This post req is working in postman
    const { user, description } = req.body
    const postedMeta = new Archive({ user, description }).save()
    res.status(201).json(postedMeta)

    const file = req.files.file
    const fileName = file.name
    const extension = path.extname(fileName)
    //const user = file.user

    const allowedExtensions = /xml|jpeg|jpg|pdf/

    if (!allowedExtensions.test(extension)) throw 'Unsupported file type!'

    //mv = move the file to current dir/client(react)/public
    file.mv(`${__dirname}/client/public/uploads/${file.name}`)
    //*New try with res.send
    // res.send({
    //   status: true,
    //   message: 'File is uploaded',
    //   data: {
    //     data: file.data,
    //     // user: data.user,
    //     // description: data.description,
    //     name: file.name,
    //     fileName: file.name,
    //     mimetype: file.mimetype,
    //     size: file.size,
    //     // date: moment().add(10, 'days').calendar(),
    //   },
    // })
    // console.log(data)
    res.json({
      // this is our status 200, everything is working
      message: 'File uploaded successfully!',
      fileName: file.name,
      //user: req.body,
      user: data.user, //dosent show in console
      //?description: data.body, //dosent show in console
      description: data.description,
      date: moment().add(10, 'days').calendar(), //! wrong date?!
      filePath: `uploads/${file.name}`,
      //filePath: `http://localhost:5050/uploads/${file.name}`,
      extension: path.extname(fileName),
      mimetype: file.mimetype,
    })
  } catch (err) {
    //catch if path doesnt exist
    console.error(err)
    console.log('Server error status 500') //! take this away later*********
    //500 server error
    return res.status(500).send(err)
  }
})

// TODO Delete endpoint
//? maybe pass in an id for the spec. file?
//app.delete('/files', (req, res) => {})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
