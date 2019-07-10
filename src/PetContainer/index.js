import React, { Component } from 'react';
import Pets from '../Pets';
import CreatePetModal from '../CreatePetModal';
import ViewPet from '../ViewPet';

require('../App.css');

let isMounted = false;

class PetContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			firstName: '',
			middleName: '',
			lastName: '',
			weight: '',
			age: '',
			peopleSkills: '',
			dogSkills: '',
			favTreat: '',
			favToy: '',
			favPlay: '',
			breed: '',
			fixed: '',
			owner: '',
			bio: '',
			sex: '',
			petPhoto: '',
			_id: '',
			addPet: false,
			pets: [],
			activePet: false,
			petViewModal: false,
			petToView: {
				firstName: '',
				middleName: '',
				lastName: '',
				weight: '',
				age: '',
				peopleSkills: '',
				dogSkills: '',
				favTreat: '',
				favToy: '',
				favPlay: '',
				breed: '',
				fixed: '',
				owner: '',
				bio: '',
				sex: '',
				petPhoto: '',
				_id: ''
			},
			editPetModal: false,
			petToEdit: {
				firstName: '',
				middleName: '',
				lastName: '',
				weight: '',
				age: '',
				peopleSkills: '',
				dogSkills: '',
				favTreat: '',
				favToy: '',
				favPlay: '',
				breed: '',
				fixed: '',
				owner: '',
				bio: '',
				sex: '',
				petPhoto: '',
				_id: ''
			}
		}
	}
	getPet = async () => {
		const pet = await fetch(process.env.REACT_APP_URL + '/pet', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type':'application/json'
			}
		})
		const petParsedResponse = await pet.json();
		return petParsedResponse;
	}
	componentDidMount() {
		this.getPet().then(pet => {
			if(pet.status === 200) {
				let petArray = pet.data[0].pet
				this.setState({
					pets: petArray,
					activePet: true,
					username: pet.data[0].username
				})
			} else {
				this.setState({
					activePet:false
				})
			}
		})
	}
	componentDidUpdate(prevProps, prevState) {
		if(isMounted) {
			if(prevProps.pets !== prevState.pets) {
				this.getPet().then(pet => {
					if(pet.status === 200) {
						let petArray = pet.data[0].pet
						this.setState({
							pets: petArray
						})
					}
				})
			}
		}
	}
	componentWillUnmount() {
		isMounted = false;
	}
	closeAddPetModal = () => {
		this.setState({
			addPet: false
		}) 
	}
	openAddPetModal = () => {
		this.setState({
			addPet: true
		})
	}
	viewPet = async (pet) => {
		try {
			const selectedPet = fetch(process.env.REACT_APP_URL + '/pet/' + pet._id, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type':'application/json'
				}
			})
			const petParsedResponse = await selectedPet.json();
			return petParsedResponse
		} catch(err) {
			console.error(err)
		}
	}
	openAndEditPet = (pet) => {
		this.setState({
			editPetModal: true,
			petToEdit: {
				...pet
			}
		})
	}
	closeAndUpdatePet = async (e) => {
		e.preventDefault();
		try {
			const editPet = await fetch(process.env.REACT_APP_URL + '/pet/' + this.state.petToEdit._id + '/update', {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify({...this.state.petToEdit}),
				headers: {
					'Content-Type':'application/json'
				}
			})
			this.getPet().then(pet => {
				let petArray = pet.data[0].pet;
				this.setState({
					pet: petArray,
					editPetModal: false
				})
			})
		} catch(err) {
			console.error(err)
		}
	}
	closeEditPetModal() {
		this.setState({
			editPetModal: false
		})
	}
	petViewToggle = (pet) => {
		if(!this.state.petViewModal) {
			this.setState({
				petViewModal: true,
				petToView: {
					...pet
				}
			})
		} else {
			this.setState({
				petViewModal: false
			})
		}
	}
	deletePet = async (id) => {
		try {
			const deletedPet = await fetch(process.env.REACT_APP_URL + '/pet/' + id + '/delete', {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type':'application/json'
				}
			})
			const parsedResponse = await deletedPet.json();
			let pets = parsedResponse.data.pet;
			this.setState({
				pets: pets
			})
		} catch(err) {
			console.error(err)
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	handlePetEditChange = (e) => {
		this.setState({
			petToEdit: {
				...this.state.petToEdit,
				[e.currentTarget.name]: e.currentTarget.value
			}
		})
	}
	render(){
		return (
			<div>
				<Pets userInfo={this.props.userInfo} petInfo={this.state.pets} viewPet={this.petViewToggle} openAndEditPet={this.openAndEditPet} petViewModal={this.state.petViewModal} deletePet={this.deletePet} />
				<br/>
				<br/>
				<br/>
				<button className='newPet' onClick={this.openAddPetModal}>Add a Pet?</button>
				{this.state.addPet ? <CreatePetModal getPet={this.getPet} closeAddPet={this.closeAddPetModal} openAddPet={this.openAddPetModal} pets={this.state.pets} addPet={this.state.addPet} /> : null}
				{this.state.petViewModal ? <ViewPet petViewToggle={this.petViewToggle} petToView={this.state.petToView} petViewModal={this.state.petViewModal} /> : null }
			</div>
		)
	}
}

export default PetContainer;