import React, { Component } from 'react';
import MapContainer from '../MapContainer';

class ParkContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			parks: [],
			pageToken: '',
			parksGathered: false
		}
	}
	getParks = async () => {
	    try {
	      const dogParks = await fetch(process.env.REACT_APP_URL + '/parks', {
	        method: 'GET',
	        credentials: 'include',
	        headers: {
	          'Content-Type':'application/json'
	        }
	      })
	      const parsedResponse = await dogParks.json();
	      return parsedResponse
	    } catch(err) {
	      console.error(err);
	    }
    }
	async componentDidMount() {
		await this.getParks().then(park => {
			let parksArray = park.data.results
			this.setState({
				parks: parksArray,
				pageToken: park.data.next_page_token,
				parksGathered: true
			})
		})
	}
    render(){
    	let waitingResponse = null;
    	if(!this.state.parksGathered){
    		waitingResponse = <h1>Gathering Nearby Dog Park Information...</h1>
    	} else {
    		waitingResponse = <h1>Here is a List of Nearby Dog Parks!</h1>
    	}
    		return(
    			<div>
	    			<div>
	    			{waitingResponse}
	    			</div>
	    			<div>
	    			<MapContainer parks={this.state.parks} />
	    			</div>
	    		</div>
    	
    	
        )
    }
}

export default ParkContainer