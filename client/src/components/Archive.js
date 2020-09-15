import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Archive = (uploadedFile) => {
  //?not sure if this is the rigth way to go.....
  const [loading, setLoading] = useState()
  const [list, setList] = useState([]) //? list with all meta data

  //TODO fetch with axios the uploaded files and info here
  useEffect(() => {
    setLoading({ loading: true })
    axios.get('http://localhost:5050/files').then((files) => {
      const allData = files.file
      console.log('All data', allData)
      setLoading({ loading: false, file: allData })
    })
    //   .then((res) => res.json())
    //   .then((json) => setList(json))
    // console.log(setList)
  }, [setLoading]) //dependencies for when the fecth should update

  useEffect(() => {
    //setLoading({ loading: true })
    fetch('http://localhost:5050/files')
      .then((res) => res.json())
      .then((json) => setList(json))
    //console.log('All meta', setList)
    //setLoading({ loading: false, file: allData })
  }, [list]) //dependencies for when the fecth should update
  //   .then((res) => res.json())
  //   .then((json) => setList(json))
  // console.log(setList)
  //}, [setLoading, list]) //dependencies for when the fecth should update

  //TODO delete btn function handled with axios, need to pass in an :id
  const handleDeleteClick = () => {
    console.log('handleDeleteClick')
    axios.delete('http://localhost:5050/files', {
      params: {},
    })
  }

  return (
    <div className='container m-4'>
      <div className='row row-cols-6'>
        <div className='col py-3 px-lg-5 border bg-light'>Type (Icon)</div>
        <div className='col py-3 px-lg-5 border bg-light'>File Name</div>
        <div className='col py-3 px-lg-5 border bg-light'>Description</div>
        <div className='col py-3 px-lg-5 border bg-light'>Uploaded by</div>
        <div className='col py-3 px-lg-5 border bg-light'>Date</div>
        <div className='col py-3 px-lg-5 border bg-light'>Delete</div>
        {/* .map through the result from the uploaded files */}
        {/* {allData.map((data) => { */}
        <div className='col py-3 px-lg-5 border bg-light'>
          {uploadedFile.extention}
          {/* Icon depending on {data.extension} */}
        </div>
        <div className='col py-3 px-lg-5 border bg-light'>
          {uploadedFile.fileName}
        </div>
        <div className='col py-3 px-lg-5 border bg-light'>
          {uploadedFile.description}
          {/* {data.description} */}
        </div>
        <div className='col py-3 px-lg-5 border bg-light'>
          {uploadedFile.user}
          {/* {data.user} */}
        </div>
        <div className='col py-3 px-lg-5 border bg-light'>
          {uploadedFile.date}
          {/* {data.date} */}
        </div>
        <div
          className='col py-3 px-lg-5 border bg-light'
          onClick={handleDeleteClick}
        >
          <span>✖︎</span>
        </div>
      </div>
    </div>
  )
}

export default Archive
