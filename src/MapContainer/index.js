import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends Component {
    render(){
    	const parkMarkers = this.props.parks.map((parks, i) => {
    		console.log(parks);
    		return(
    			<Marker key={parks.id} name={parks.name} position={{lat: parks.geometry.location.lat, lng: parks.geometry.location.lng}} />
    		)
    	})
        return(
        	<div>
		    	<Map defaultZoom={10} style={{width: '40%', height: '37.2%', position: 'relative'}} google={this.props.google} initialCenter={{lat: 41.878113, lng: -87.629799}}>
		    		<Marker name={'Chicago'} position={{lat: 41.878113, lng: -87.629799}} />
		    		{parkMarkers}
		    		<InfoWindow onClose={this.onInfoWindowClose}>
		    		<button onClick={this.showDetails}>View Details</button>
		    		</InfoWindow>
		    	</Map>
		    </div>
        )
    }
}

export default GoogleApiWrapper({
	apiKey: (process.env.REACT_APP_GMAPS_KEY)
})(MapContainer)