import React from 'react';
require('../App.css');



const Photos = (props) => {
	let response = null
	if(props.photoInfo.length <= 0) {
		response = <p>{props.userInfo.username}, you've gotta share your pics with the world!</p>
		return response
	} else {
		const photos = props.photoInfo.map((photo, i) => {
			return (
				<div className='photoThumbnail' key={i}>
					<div className='photoCard'>
						<div className='photoContainer'>
							<div >
								<div>
									<img alt='User upload' className='photoList' src={`${process.env.REACT_APP_URL}/${photo.photoUrl}`} />
								</div>
							</div>
							<br/>
							<br/>
							<br/>
							<label>{photo.description}</label>
							<br/>
							<button className='medPosBtns' onClick={props.photoViewToggle.bind(null, photo)}>View</button>
							<button className='medPosBtns' onClick={props.editPhotoOpen.bind(null, photo)}>Edit</button>
							<button className='medNegBtns' onClick={props.deletePhoto.bind(null, photo._id)}>Delete</button>
						</div>
					</div>
				</div>
			)
		})
		return (
			<div className='listContainer'>
				{response}
				<br/>
				{photos}
				<br/>
			</div>
		)
	}
}

export default Photos;