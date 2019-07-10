import React, { Component } from 'react';
import CreatePhotoModal from '../CreatePhotoModal';
import EditPhotoModal from '../EditPhotoModal';
import Photos from '../Photos'
import axios from 'axios';

require('../App.css');

let isMounted = false;

class PhotoContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			selectedFile: null,
			description: '',
			photos: [],
			photoEdit: false,
			photoToEdit: {
				description: '',
				photoUrl: '',
				_id: ''
			},
			addPhoto: false,
			photoView: false,
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
				let photoArray = photo.data
				console.log(photo);
				isMounted = true;
				this.setState({
					photos: photoArray,
					username: photo.data[0].username
				})
			} else {
				console.log(photo.status);
			}
		})
	}
	componentDidUpdate(prevProps, prevState) {
		if(isMounted) {
			if(prevProps !== prevState) {
				this.getPhoto().then(photo => {
					if(photo.status === 200) {
						let photoArray = photo.data
						isMounted = true
						this.setState({
							photos: photoArray
						})
					}
				})
			}
		}
	}
	componentWillUnmount() {
		isMounted = false
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
		await axios.post(process.env.REACT_APP_URL + '/photo/new', formData, { withCredentials: true})
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
			formData.append('photoUrl', this.state.selectedFile, this.state.selectedFile.name);
			formData.append('description', this.state.photoToEdit.description);
			formData.append('_id', this.state.photoToEdit._id)
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
	photoViewToggle = (e) => {
		console.log(e);
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
				<Photos userInfo={this.props.userInfo} photoInfo={this.state.photos} viewPhoto={this.photoViewToggle} editPhotoOpen={this.editPhotoOpen} photoViewModal={this.state.photoView} deletePhoto={this.deletePhoto} />
				{this.state.editPhoto ? <EditPhotoModal editPhotoOpen={this.editPhotoOpen} editPhotoClose={this.editPhotoClose} fileSelectHandler={this.fileSelectHandler} handlePhotoEditChange={this.handlePhotoEditChange} selectedFile={this.state.selectedFile} editPhoto={this.state.editPhoto} handlePutSubmit={this.handlePutSubmit} photoToEdit={this.state.photoToEdit} /> : null}
				{this.state.addPhoto ? <CreatePhotoModal addPhotoOpen={this.addPhotoOpen} addPhotoClose={this.addPhotoClose} fileSelectHandler={this.fileSelectHandler} handleChange={this.handleChange} handlePostSubmit={this.handlePostSubmit} addPhoto={this.state.addPhoto} selectedFile={this.state.selectedFile} /> : null }
				<br/>
				<br/>
				<button onClick={this.addPhotoOpen} >Add a Photo</button>
			</div>
		)
	}
}

export default PhotoContainer;