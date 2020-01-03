import React from 'react';
require('../../App.css');


const Pets = (props) => {

	let response = null
	if(props.petInfo.length <= 0) {
		response = <p>{props.userInfo.username}, you've gotta share your pups with the world!</p>
		return response	
	} else {
		let foundPets = props.petInfo;
		let pets = foundPets.map((pet, i) => {
			if(props.user) {
				return (
				    <div className="col s12 m7 l4" key={i}>
						<div className="card grey lighten-1 center-align">
							<div className="card-image">
								<img alt={pet.firstName} src={`${process.env.REACT_APP_URL}/${pet.petPhoto}`} />
							</div>
							<span className="card-title blue-text text-darken-2">{pet.firstName}</span>
						</div>
					</div>
				)
			} else {
				return (
				    <div className="col s12 m7 l4" key={i}>
						<div className="card grey lighten-1 center-align">
							<div className="card-image">
								<img alt={pet.firstName} src={`${process.env.REACT_APP_URL}/${pet.petPhoto}`} />
							</div>
							<span className="card-title blue-text text-darken-2">{pet.firstName}</span>
							<div className="card-action">
								<button className="btn-medium waves-effect waves-light blue darken-2" onClick={props.viewPet.bind(null, pet)}><i className="material-icons right">open_in_new</i>View</button> 
								<button className="btn-medium waves-effect waves-light green darken-1 white" onClick={props.openAndEditPet.bind(null, pet)}><i className="material-icons right">mode_edit</i>Edit</button>
								<button className="btn-medium waves-effect waves-light red accent-4" onClick={props.deletePet.bind(null, pet._id)}><i className="material-icons right">delete_forever</i></button>
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
				{pets}
				<br/>
			</div>
		)
	}
}

export default Pets;