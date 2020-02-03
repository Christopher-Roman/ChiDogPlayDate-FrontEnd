import React, { Component } from 'react';
import axios from 'axios';
import Pets from '../PetContainer/Pets'
import Photos from '../PhotoContainer/Photos'


class UserContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: props.userInfo.username,
			emailAddress: '',
			bio: '',
			userPhoto: '',
			address: '',
			_id: '',
			selectedFile: '',
			view: 'profile info',
			pet: [],
			post: [],
			photo: [],
			userBio: '',
			userAddress: '',
			userEmail: ''
		}
	}
	getUser = async () => {
		const user = await fetch(process.env.REACT_APP_URL + '/users', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type':'application/json'
			}
		})
		const parsedResponse = await user.json();
		return parsedResponse;
	}
	componentDidMount = () => {
		this.getUser().then(user => {
			if(user.status === 200) {
				let photoArray = user.data.photo;
				let petArray = user.data.pet;
				let postArray = user.data.post;
				this.setState({
					userPhoto: user.data.userPhoto,
					username: user.data.username,
					photo: photoArray,
					post: postArray,
					pet: petArray,
					_id: user.data._id,
					userBio: user.data.bio,
					userAddress: user.data.address,
					userEmail: user.data.emailAddress
				})
			}
		})
	}
	fileSelectHandler = (e) => {
		this.setState({
			selectedFile: e.target.files[0]
		})
	}
	userPhoto = async () => {
		const formData = new FormData();
		formData.append('userPhoto', this.state.selectedFile, this.state.selectedFile.name)
		await axios.put(process.env.REACT_APP_URL + '/users/' + this.state._id + '/update', formData, { withCredentials: true})
	}
	updateUser = async (e) => {
		e.preventDefault();
		const userUpdates = await fetch(process.env.REACT_APP_URL + '/users/' + this.state._id + '/update', {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({
				username: this.state.username,
				emailAddress: this.state.emailAddress,
				bio: this.state.bio,
				address: this.state.address
			}),
			headers: {
				'Content-Type':'application/json'
			}
		})
		const parsedResponse = await userUpdates.json()
		this.setState({
			username: parsedResponse.data.username,
			emailAddress: parsedResponse.data.emailAddress,
			bio: parsedResponse.data.bio,
			address: parsedResponse.data.address
		})
	}
	handlePhotoUpdate = async (e) => {
		e.preventDefault();
		this.userPhoto();
		this.getUser();
	}
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	viewPet = (e) => {
		if(this.state.view !== 'pet') {
			this.setState({
				view: 'pet'
			})	
		} else {
			this.setState({
				view: 'profile info'
			})
		}
	}
	viewPhoto = (e) => {
		if(this.state.view !== 'photos') {
			this.setState({
				view: 'photos'
			})	
		} else {
			this.setState({
				view: 'profile info'
			})
		}
	}
	render() {
		return (
			<div>
				{this.state.view === 'profile info' ? <div className="container">
				    <div className="card blue-grey lighten-3 large center-align">
					    <div className='profile-picture'>
						  {this.state.userPhoto ? <img alt='User' src={`${process.env.REACT_APP_URL}/${this.state.userPhoto}`} /> : null}
					    </div>
					    <span className="card-title blue-text text-darken-2">{this.state.userBio}</span>
					    <div className="card-action">
						  <button className="btn-large waves-effect waves-light blue darken-2" onClick={this.viewPet}>Pets</button> 
						  <button className="btn-large waves-effect waves-light green darken-1" onClick={this.viewPhoto}>Photos</button>
						  <button className="btn-large waves-effect waves-light red lighten-1">Posts</button>
					    </div>
				    </div>
				</div> : null }
				{this.state.view === 'add photo' ? 
				<form onSubmit={this.handlePhotoUpdate} >
					<label>Add a Photo</label>
					<input type='file' name='userPhoto' onChange={this.fileSelectHandler} ref={fileInput => this.fileInput = fileInput} />
					<button>submit</button>
				</form> : null }
				{this.state.view === 'update info' ? 
				<form onSubmit={this.updateUser} >
					<label>Address</label>
					<input type='text' name='address' onChange={this.handleChange} />
					<label>Bio</label>
					<input type='text' name='bio' onChange={this.handleChange} />
					<label>Email</label>
					<input type='text' name='emailAddress' onChange={this.handleChange} />
					<button>submit</button>
				</form> : null }
				{this.state.view === 'pet' ? 
					<div>
						<button className="btn-large waves-effect waves-light blue darken-2" onClick={this.viewPet}>Back<i class="material-icons right">keyboard_arrow_right</i></button> 
						<Pets user={'user'} petInfo={this.state.pet} userInfo={this.state} name={this.state.username} /> 
					</div>
				: null}
				{this.state.view === 'photos' ?
					<div>
						<button className="btn-large waves-effect waves-light green darken-1" onClick={this.viewPhoto}>Back<i class="material-icons right">keyboard_arrow_right</i></button>
						<Photos user={'user'} photoInfo={this.state.photo} userInfo={this.state} name={this.state.username} />
					</div> 
				: null}
			</div>
		)
	}
}

export default UserContainer