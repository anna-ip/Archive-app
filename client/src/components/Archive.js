import React, { useEffect, useState } from 'react'
import '../style/Archive.css'
import axios from 'axios'

const Archive = () => {
	const [loading, setLoading] = useState()

	//fetch the uploaded files and info here with axios
	useEffect(() => {
		setLoading({ loading: true });
		axios.get('/upload').then((files) => {
			const allData = files.file;
			console.log('allData', allData)
			setLoading({ loading: false, file: allData });
		});
	}, [setLoading]);


	//delete btn function
	const handleDeleteClick = () => {
		axios.delete(URL, {
			// params: { foo: 'bar' }
		})
	}


	return (
		<div className='container'>
			<div className='header'>
				<h4>Icon</h4>
				<h4>File Name</h4>
				<h4>Description</h4>
				<h4>Uploaded by</h4>
				<h4>Date</h4>
				<h4>Delete</h4>
			</div>
			<div className='columns'>
				{/* .map through the result from the uploaded files */}
				{/* {allData.map((data) => { */}
				<ul>
					<div>
						{/* {data.name} */}
					</div>
					{/* {data.data.description} */}
					{/* {data.user} */}
					{/* {data.date} */}
					<button className="delete-btn" onClick={handleDeleteClick}>
						<span>✖︎</span>
					</button>
				</ul>
				{/* })} */}
			</div>


		</div>
	)
}

export default Archive