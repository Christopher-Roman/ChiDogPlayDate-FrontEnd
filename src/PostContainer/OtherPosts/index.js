import React from 'react';
require('../../App.css');

const OtherPosts = (props) => {
	let globalResponse = null;
	let globalOnly = []
	const globalPosts = props.postInfo.forEach(post => {
		if(post.createdBy !== props.userInfo) {
			globalOnly.push(post)
		}
	})
	console.log(globalOnly);
	if(globalOnly.length <= 0) {
		globalResponse = <p>{props.userInfo.username}, what's on your mind?</p>
		return globalResponse
	} else {
		const posts = globalOnly.map((post, i) => {
			return (
			    <div className="" key={i}>
			      <div className="card blue-grey darken-1">
			        <div className="card-content white-text">
			          <span className="card-title">{post.postTitle}</span>
			          <p className='truncate'>{post.postBody}</p>
			        </div>
			      </div>
			    </div>
			)
		})
		return (
			<div className='row'>
			{globalResponse}
			<br/>
			{posts}
			<br/>
			</div>
		)
	}
}

export default OtherPosts