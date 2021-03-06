import React, { Component } from 'react';
import CreatePhotoModal from './CreatePhotoModal';
import EditPhotoModal from './EditPhotoModal';
import Photos from './Photos'
import ViewPhoto from './ViewPhoto'
import axios from 'axios';

require('../App.css');

class PhotoContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: props.userInfo.username,
			selectedFile: null,
			description: '',
			photos: [],
			activePhoto: false,
			photoEdit: false,
			photoToEdit: {
				description: '',
				photoUrl: '',
				_id: ''
			},
			addPhoto: false,
			viewPhoto: false,
			photoToView: {
				description: '',
				photoUrl: '',
				createdBy: '',
				comment: [],
				createdAt: '',
				_id: ''
			},

		}
	}
	getPhoto = async () => {
		const photo = await fetch(process.env.REACT_APP_URL + '/photo', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type':'application/json'
			}
		})
		const parsedPhotoResponse = await photo.json();
		return parsedPhotoResponse
	}
	componentDidMount() {
		this.getPhoto().then(photo => {
			if(photo.status === 200) {
				let photoArray = photo.data.photo
				this.setState({
					photos: photoArray,
					username: photo.data.username,
					activePhoto: true
				})
			} else {
				console.log(photo.status);
			}
		})
	}
	addPhotoOpen = () => {
		this.setState({
			addPhoto: true
		})
	}
	addPhotoClose = () => {
		this.setState({
			addPhoto: false
		})
	}
	fileSelectHandler = (e) => {
		this.setState({
			selectedFile: e.target.files[0]
		})
	}
	newPhoto = async () => {
		const formData = new FormData();
		formData.append('photoUrl', this.state.selectedFile, this.state.selectedFile.name);
		formData.append('description', this.state.description);
		await axios.post(process.env.REACT_APP_URL + '/photo/new', formData, { withCredentials: true}).then((response) => {
			if(response.status === 200) {
				this.setState({
					photos: [...response.data.data.photo],
					addPhoto: false
				})
			}
		})
	}
	handlePostSubmit = async (e) => {
		e.preventDefault();
		this.newPhoto();
		this.addPhotoClose();
		this.getPhoto()
	}
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	editPhotoOpen = (photo) => {
		this.setState({
			editPhoto: true,
			photoToEdit: {
				...photo
			}
		})
	}
	editPhotoClose = () => {
		this.setState({
			editPhoto: false
		})
	}
	handlePhotoEditChange = (e) => {
		this.setState({
			photoToEdit: {
				...this.state.photoToEdit,
				[e.currentTarget.name]: e.currentTarget.value
			}
		})
	}
	closeAndUpdatePhoto = async () => {
		try {
			const formData = new FormData()
			if(this.state.selectedFile) {
				formData.append('photoUrl', this.state.selectedFile, this.state.selectedFile.name);
				formData.append('description', this.state.photoToEdit.description);
			} else {
				formData.append('description', this.state.photoToEdit.description);
			}
			const editPhoto = await axios.put(process.env.REACT_APP_URL + '/photo/' + this.state.photoToEdit._id + '/update', formData, {withCredentials: true}, {
			}).then(response => {
				return response.data
			})
		} catch(err) {
			console.error(err) 
		}
	}
	handlePutSubmit = async (e) => {
		e.preventDefault();
		this.closeAndUpdatePhoto();
		this.editPhotoClose();
		this.getPhoto()
	}
	photoViewOpen = (photo) => {
		this.setState({
			viewPhoto: true,
			photoToView: {
				...photo
			}
		})
	}
	photoViewClose = () => {
		this.setState({
			viewPhoto: false
		})
	}
	deletePhoto = async (id) => {
		try {
			const deletedPhoto = await fetch(process.env.REACT_APP_URL + '/photo/' + id + '/delete', {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type':'application/json'
				}
			})
			const parsedResponse = await deletedPhoto.json();
			let photos = parsedResponse.data.photo;
			this.setState({
				photos: photos
			})
		} catch(err) {
			console.error(err);
		}
	}
	render() {
		return (
			<div>
				<button className='btn-large grey lighten-1 blue-text text-darken-2 center-align' onClick={this.addPhotoOpen}><i className="large material-icons right">panorama</i>Add a Photo</button>
				<br/>
				<br/>
				{this.state.activePhoto ? <Photos userInfo={this.state.username} photoInfo={this.state.photos} photoViewToggle={this.photoViewOpen} editPhotoOpen={this.editPhotoOpen} deletePhoto={this.deletePhoto} /> : null }
				{this.state.addPhoto ? <CreatePhotoModal addPhotoOpen={this.addPhotoOpen} addPhotoClose={this.addPhotoClose} fileSelectHandler={this.fileSelectHandler} handleChange={this.handleChange} handlePostSubmit={this.handlePostSubmit} addPhoto={this.state.addPhoto} selectedFile={this.state.selectedFile} /> : null }
				{this.state.viewPhoto ? <ViewPhoto userInfo={this.state} photoInfo={this.state.photos} photoToView={this.state.photoToView} viewPhoto={this.state.viewPhoto} photoViewClose={this.photoViewClose} /> : null}
				{this.state.editPhoto ? <EditPhotoModal editPhotoOpen={this.editPhotoOpen} editPhotoClose={this.editPhotoClose} fileSelectHandler={this.fileSelectHandler} handlePhotoEditChange={this.handlePhotoEditChange} selectedFile={this.state.selectedFile} editPhoto={this.state.editPhoto} handlePutSubmit={this.handlePutSubmit} photoToEdit={this.state.photoToEdit} /> : null}
			</div>
		)
	}
}

export default PhotoContainer;