import React from 'react';
require('../App.css');

const EditPost = (props) => {
	let foundComments = props.postToView.comment
	const comments = foundComments.map((comment) => {
		return (
			<div key={comment._id} className="col s12 m7 l4">
				<div class="card blue-grey darken-1">
			        <div class="card-content white-text">
			          <span class="card-title">{comment.createdBy}</span>
			          <p>{comment.commentBody}</p>
			        </div>
			        <div class="card-action">
			          <a href="#">This is a link</a>
			          <a href="#">This is a link</a>
			        </div>
			    </div>
			</div>
		)
	})
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
		        </div>
		    </div>
			<div className='row'>
				{comments}
			</div>
		</div>
	)
}

export default EditPost;