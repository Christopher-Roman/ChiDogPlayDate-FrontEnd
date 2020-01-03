import React, { Component } from 'react';
import axios from 'axios';
import Pets from '../PetContainer/Pets'


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
			view: '',
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
		if(!this.state.view) {
			this.setState({
				view: 'pet'
			})	
		} else {
			this.setState({
				view: null
			})
		}
	}
	render() {
		return (
			<div>
				<button onClick={this.viewPet}>Pets</button>
				<div>
				<br/>
				{!this.state.view ? <div> <h1>Hello {this.state.username}</h1>
				<div className='profile-picture'>
				{this.state.userPhoto && !this.state.view ? <img alt='User' src={`${process.env.REACT_APP_URL}/${this.state.userPhoto}`} /> : null}
				</div>
				<br/>
				<br/>
				{this.state.userBio}
				<br/>
				<br/>
				{this.state.userEmail}
				<br/>
				<br/>
				{this.state.userAddress}
				<br/>
				<br/>
				<button onClick={this.printState}>click me</button>
				<br/>
				<br/>
				<form onSubmit={this.handlePhotoUpdate} >
					<label>Add a Photo</label>
					<input type='file' name='userPhoto' onChange={this.fileSelectHandler} ref={fileInput => this.fileInput = fileInput} />
					<button>submit</button>
				</form>
				<br/>
				<br/>
				<form onSubmit={this.updateUser} >
					<label>Address</label>
					<input type='text' name='address' onChange={this.handleChange} />
					<label>Bio</label>
					<input type='text' name='bio' onChange={this.handleChange} />
					<label>Email</label>
					<input type='text' name='emailAddress' onChange={this.handleChange} />
					<button>submit</button>
				</form>
				<br/>
				<br/>
				<br/>
				<br/> </div> : null}
				</div>
				{this.state.view === 'pet' ? <Pets user={'user'} petInfo={this.state.pet} userInfo={this.state} name={this.state.username} /> : null}
			</div>
		)
	}
}

export default UserContainer