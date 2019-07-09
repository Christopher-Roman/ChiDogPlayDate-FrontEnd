import React from 'react';
require('../App.css');


const Pets = (props) => {

	let response = null
	if(props.petInfo.length <= 0) {
		response = <p>{props.userInfo.username}, you've gotta share your pups with the world!</p>
		return response
	} else {
		let foundPets = props.petInfo;
		const pets = foundPets.map((pet, i) => {
			return (
				<div className='photoThumbnail' key={i}>
					<div className='petCard'>
						<div className='petContainer'>
							<label>{pet.firstName}</label>
							<br/>
							<br/>
							<div >
								<div>
									<img alt='A users pet' className='petListPhoto' src={`${process.env.REACT_APP_URL}/${pet.petPhoto}`} />
								</div>
							</div>
							<br/>
							<button className='medPosBtns' onClick={props.viewPet.bind(null, pet)}>View</button>
							<button className='medPosBtns' onClick={props.openAndEditPet.bind(null, pet)}>Edit</button>
							<button className='medNegBtns' onClick={props.deletePet.bind(null, pet._id)}>Delete</button>
						</div>
					</div>
				</div>
			)
		})
		return (
			<div className='listContainer'>
				{response}
				<br/>
				{pets}
				<br/>
			</div>
		)
	}
}

export default Pets;