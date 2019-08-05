import React from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'
require('../App.css')


  document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems);
  });

//*****************************************//
//										   //
//		Simple header component that 	   //
//		will offer additional options      //
//		as the site is built out.		   //
//		Rendered in App.js				   //
//										   //
//*****************************************//


const HeaderApp = (props) => {
			// {props.userInfo.loggedIn ? <li><button className="waves-effect waves-light btn blue accent-1" onClick={props.viewPosts} href="/">Posts</button></li> : null}
	return (
		<div>
			<nav className='nav-extended'>
			    <div className="nav-wrapper red accent-4">
			      <span id='logo' className="responsive-img blue-grey-text text-lighten-4 right">ChiDogs<img className="responsive-img right" alt="logo" src={'Chidog-logo-favicon.png'}/></span>
			      <button data-target="mobile-demo" className="hide-on-large-only btn-flat sidenav-trigger"><i className="material-icons">menu</i></button>
			      <ul id="nav-mobile" className="left hide-on-med-and-down">
					{props.userInfo.loggedIn ? <li><button className="waves-effect waves-light btn-large blue-grey lighten-4 blue-text text-darken-2" onClick={props.viewPets}><i className="large material-icons right">pets</i>Pets</button></li> : null}
					{props.userInfo.loggedIn ? <li><button className="waves-effect waves-light btn-large blue-grey lighten-4 blue-text text-darken-2" onClick={props.viewPhotos}><i className="large material-icons right">panorama</i>Photos</button></li> : null}
					{props.userInfo.loggedIn ? <li><button className="waves-effect waves-light btn-large blue-grey lighten-4 blue-text text-darken-2" onClick={props.viewPosts}><i className="large material-icons right">comment</i>Posts</button></li> : null}
					{props.userInfo.loggedIn ? <li><button className="waves-effect waves-light btn-large blue-grey lighten-4 blue-text text-darken-2" onClick={props.viewUser}><i className="large material-icons right">person</i>Profile</button></li> : null}
					{props.userInfo.loggedIn ? <li><button className="waves-effect waves-light btn-large blue-grey lighten-4 blue-text text-darken-2" onClick={props.viewMaps}><i className="large material-icons right">map</i>Parks</button></li> : null}
			      	{props.userInfo.loggedIn ? <li><button className="waves-effect waves-light btn-large blue-grey lighten-4 blue-text text-darken-2" onClick={props.handleLogout}>Logout</button></li> : null}
			      </ul>
			    </div>
			</nav>
			<ul className="sidenav" id="mobile-demo">
				<button data-target="mobile-demo" id='nav-close' className="btn-flat btn-large sidenav-close hide-on-large-only"><i className="large material-icons">close</i></button>
				{!props.userInfo.loggedIn ? <h5>You must be logged in to utilize this menu.</h5> : null}
			    {props.userInfo.loggedIn ? <li><button className="blue-text text-darken-2" onClick={props.viewPets}><i className="material-icons right">pets</i>Pets</button></li> : null}
				{props.userInfo.loggedIn ? <li><button className="blue-text text-darken-2" onClick={props.viewPhotos}><i className="material-icons right">panorama</i>Photos</button></li> : null}
				{props.userInfo.loggedIn ? <li><button className="blue-text text-darken-2" onClick={props.viewPosts}><i className="material-icons right">comment</i>Posts</button></li> : null}
				{props.userInfo.loggedIn ? <li><button className="blue-text text-darken-2" onClick={props.viewUser}><i className="material-icons right">person</i>Profile</button></li> : null}
				{props.userInfo.loggedIn ? <li><button className="blue-text text-darken-2" onClick={props.viewMaps}><i className="material-icons right">map</i>Parks</button></li> : null}
		      	{props.userInfo.loggedIn ? <li><button className="blue-text text-darken-2" onClick={props.handleLogout}>Logout</button></li> : null}
	        </ul>
		</div>
	)
}

export default HeaderApp