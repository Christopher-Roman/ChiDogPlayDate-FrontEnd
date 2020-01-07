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
	if(globalOnly.length <= 0) {
		globalResponse = <p>Anyone out there?</p>
		return globalResponse
	} else {
		const posts = globalOnly.map((post, i) => {
			return (
			    <div className="" key={i}>
			      <div className="card grey lighten-1">
			        <div className="card-content blue-text text-darken-2">
			          <span className="card-title">{post.postTitle}</span>
			          <p className='truncate'>{post.postBody}</p>
			        </div>
			        <div className="card-action">
			          <button className='btn-flat waves-effect waves-light' onClick={props.openPost.bind(null, post)}>View</button>
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