import React from 'react';
require('../../App.css');

const ViewPost = (props) => {
	let response = null;
	let foundComments = props.postToView.comment
	if(!foundComments) {
		response = <p>{props.userInfo.username}, what's on your mind?</p>
		return response
	} else {
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
	}
	return (
		<div className='container'>
			<div className="col s12 m6 l12">
		        <div className="card blue-grey darken-1">
			        <span className="card-title left">{props.postToView.createdBy}</span>
			        <div className="card-content white-text">
			          <span className="card-title left">{props.postToView.postTitle}</span>
			          <span className="card-title right">{props.postToView.createdAt}</span>
			        </div>
			        <div className="card-content white-text">
			          <p>{props.postToView.postBody}</p>
			        </div>
			        <div className="card-action">
			          <button className='btn-flat waves-effect waves-light' onClick={props.closePost}>Close</button>
			          <a href="#">This is a link</a>
			        </div>
		        </div>
		    </div>
		    	{response}
			<div className='row'>
			</div>
		</div>
	)
}

export default ViewPost;