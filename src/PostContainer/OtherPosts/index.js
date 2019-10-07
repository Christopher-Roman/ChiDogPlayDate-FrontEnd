import React from 'react';
require('../../App.css');

const OtherPosts = (props) => {
	console.log(props.postInfo);
	let response = null;
	if(props.postInfo.length <= 0) {
		response = <p>{props.userInfo.username}, what's on your mind?</p>
		return response
	} else {
		const otherPosts = props.postInfo.filter(post => post.createdBy === props.userinfo)
		const posts = otherPosts.map((post, i) => {
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
			{response}
			<br/>
			{posts}
			<br/>
			</div>
		)
	}
}

export default OtherPosts