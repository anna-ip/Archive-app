import React, { useState } from 'react'
import axios from 'axios'
import Message from './Message'
import Progress from './Progress'

const FileUpload = () => {
  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('Choose File')
  const [uploadedFile, setUploadedFile] = useState({}) //{} an object
  const [user, setUser] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [uploadPercentage, setUploadPercentage] = useState(0)

  const onChange = (e) => {
    setFile(e.target.files[0]) //this could be an array of files, we chose the first one = [0]
    setFileName(e.target.files[0].name) //this changes the name in {fileName} and is the name of the above file
  }

  //? Do I need two post requests ???

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData() //FormData is part of Javascript
    //first 'file' is from backend and second file is from state
    formData.append('file', file) //means that we send along the file.
    // ? formData.append('...?...', JSON.stringify(..?....))
    console.log('file', file)

    try {
      const res = await axios.post('http://localhost:5050/upload', formData, {
        //? Do I need a body? body: JSON.stringify({ ...?..}),}
        header: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (ProgressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            )
          )

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000)
        },
      })

      const {
        fileName,
        filePath,
        date,
        extension,
        user,
        description,
      } = res.data
      console.log('res.data', res.data)

      setUploadedFile({
        fileName,
        filePath,
        date,
        extension,
        user,
        description,
      })
      console.log(
        'setUploadedFile:',
        fileName,
        filePath,
        date,
        extension,
        user,
        description
      )

      setMessage('File uploaded')
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server')
      } else {
        setMessage(err.response.data.msg) //the 400 msg from the backend
      }
    }
  }
  return (
    <>
      {message ? <Message msg={message} /> : null}
      <form className='container m-14' onSubmit={onSubmit}>
        <div className='form-group '>
          <label htmlFor='user'>Name</label>
          <input
            type='text'
            name='user'
            className='form-control'
            id='user'
            placeholder='Name'
            onChange={(event) => setUser(event.target.value)}
            value={user}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            name='description'
            className='form-control'
            id='description'
            placeholder='Description'
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            required
          />
        </div>
        <div className='custom-file mb-3'>
          <input
            type='file'
            name='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {fileName}
          </label>
        </div>
        {/* the progressbar takes in the prop percentage that will be equal to the
        uploadPercetage with default 0 */}
        <Progress className='mt-4 mb-4' percentage={uploadPercentage} />
        <input
          type='submit'
          value='Upload file'
          className='btn btn-secondary btn-block mt-6'
        />
      </form>

      {
        uploadedFile ? ( //? same as if
          <div>
            <p>{uploadedFile.fileName}</p>
            <p>{uploadedFile.user}</p>
            <p>{uploadedFile.description}</p>
            <p>{uploadedFile.date}</p>
            <p>{uploadedFile.extension}</p>
            <img src={uploadedFile.filePath} alt=''></img>
          </div>
        ) : null // : same as else
      }
    </>
  )
}

export default FileUpload
