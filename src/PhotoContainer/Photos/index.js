import React from 'react';
require('../../App.css');




const Photos = (props) => {
	let response = null
	if(props.photoInfo.length <= 0) {
		response = <p>{props.userInfo}, you've gotta share your pics with the world!</p>
		return response
	} else {
		const photos = props.photoInfo.map((photo, i) => {
			if(props.user) {
				return (
					<div className="col s12 m7 l4" key={i}>
					    <div className="card grey lighten-1 small center-align">
						    <div className="card-image">
							  <img alt={photo.description} src={`${process.env.REACT_APP_URL}/${photo.photoUrl}`} />
						    </div>
						    <span className="card-title blue-text text-darken-2">{photo.description}</span>
					    </div>
					</div>
				)
			} else {
				return (
				    <div className="col s12 m7 l4" key={i}>
					    <div className="card grey lighten-1 small center-align">
						    <div className="card-image">
							  <img alt={photo.description} src={`${process.env.REACT_APP_URL}/${photo.photoUrl}`} />
						    </div>
						    <span className="card-title blue-text text-darken-2">{photo.description}</span>
						    <div className="card-action">
							  <button className="btn-medium waves-effect waves-light blue darken-2" onClick={props.photoViewToggle.bind(null, photo)}><i className="material-icons">open_in_new</i></button> 
							  <button className="btn-medium waves-effect waves-light green darken-1" onClick={props.editPhotoOpen.bind(null, photo)}><i className="material-icons">mode_edit</i></button>
							  <button className="btn-medium waves-effect waves-light red lighten-1" onClick={props.deletePhoto.bind(null, photo._id)}><i className="material-icons">delete_forever</i></button>
						    </div>
					    </div>
				    </div>
				)
			}
		})
		return (
			<div className='row'>
				{response}
				<br/>
				{photos}
				<br/>
			</div>
		)
	}
}

export default Photos;