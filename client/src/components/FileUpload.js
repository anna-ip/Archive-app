import React, { useState } from 'react'
import axios from 'axios'

const FileUpload = () => {
	const [file, setFile] = useState('')
	const [fileName, setFileName] = useState('Choose File')
	// here should go name state and description state or data?
	const [uploadedFile, setUploadedFile] = useState({});

	const onChange = (event) => {
		//this should give an array of files in the end if only want one .files[0]
		// setFile(event.target.files)
		setFile(event.target.files[0])
		//this should give an array of file names in the end if only want one .files[0].name
		//setFileName(event.target.files.name) //this should change the name in {fileName}
		setFileName(event.target.files[0].name) //this should change the name in {fileName}
	}

	const onSubmit = async event => {
		event.preventDefault()
		const formData = new FormData()
		//first 'file' is from backend and second file is fr state
		formData.append('file', file)
		console.log('file', file)

		try {
			const res = await axios.post('/upload', formData, {
				header: {
					'Content-Type': 'multipart/form-data'
				}
			})

			const { fileName, filePath } = res.data
			console.log('res.data', res.data)
			//console.log here
			setUploadedFile({ fileName, filePath })
			console.log('setUploadedFile', fileName, filePath)

		} catch (err) {
			if (err.response.status === 500) {
				console.log('There was a problem with the server')
			} else {
				console.log('msg No file uploaded', err.response.data.msg)
			}
		}
	}
	return (
		<>
			<form onSubmit={onSubmit}>
				{/* <div className="form-group">
					<label for="formGroupExampleInput">Name</label>
					<input type="text" className="form-control" id="formGroupExampleInput" placeholder="User" required />
				</div>
				<div className="form-group">
					<label for="formGroupExampleInput2">Description</label>
					<input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Description" required />
				</div> */}
				<div className='custom-file'>
					<input
						type='file'
						name='file'
						className='custom-file-input'
						id='customFile'
						onChange={onChange} />
					<label
						className='custom-file-label'
						htmlFor='customFile'>{fileName}
					</label>
				</div>
				<input
					type='submit'
					value='Upload file'
					className='btn btn-secondary btn-block mt-4' />
			</form>
			{/* 
			{uploadedFile ? (
				<div>
					<h3>{uploadedFile.fileName}</h3>
					<img scr={uploadedFile.filePath} alt='' />
				</div>
			) : null} */}
		</>
	)

}

export default FileUpload
