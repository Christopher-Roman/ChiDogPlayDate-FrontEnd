import React from 'react';
require('../App.css');

const EditPost = (props) => {
	return (
		<div className='container'>
			<div className="col s12 m6 l12">
		        <div className="card blue-grey darken-1">
			        <span className="card-title left">{props.postToView.createdBy}</span>
			        <div className="card-content white-text">
			          <input placeholder={props.postToView.postTitle} className="card-title left"></input>
			          <input placeholder={props.postToView.createdAt} className="card-title right"></input>
			        </div>
			        <div className="card-content white-text">
			          <textarea placeholder={props.postToView.postBody}></textarea>
			        </div>
			        <button onClick={props.postClose}>Close</button>
		        </div>
		    </div>
		</div>
	)
}

export default EditPost;