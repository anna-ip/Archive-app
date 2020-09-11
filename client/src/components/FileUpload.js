import React, { useState } from 'react'
import axios from 'axios'

const FileUpload = () => {
  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('Choose File')
  const [uploadedFile, setUploadedFile] = useState({})
  const [user, setUser] = useState('')
  const [description, setDescription] = useState('')

  const onChange = (e) => {
    setFile(e.target.files[0]) //this could be an array of files, we chose the first one = [0]
    setFileName(e.target.files[0].name) //this changes the name in {fileName} and is the name of the above file
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    //first 'file' is from backend and second file is from state
    formData.append('file', file)
    console.log('file', file)

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const { fileName, filePath } = res.data
      console.log('res.data', res.data)

      setUploadedFile({ fileName, filePath })
      console.log('setUploadedFile', fileName, filePath)
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server')
      } else {
        console.log(err.response.data.msg)
      }
    }
  }
  return (
    <>
      <form className='container m-4' onSubmit={onSubmit}>
        <div className='form-group'>
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
        <div className='custom-file'>
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
        <input
          type='submit'
          value='Upload file'
          className='btn btn-secondary btn-block mt-4'
        />
      </form>

      {uploadedFile ? (
        <div>
          <p>{uploadedFile.fileName}</p>
          <img src={uploadedFile.filePath} alt=''></img>
        </div>
      ) : null}
    </>
  )
}

export default FileUpload
