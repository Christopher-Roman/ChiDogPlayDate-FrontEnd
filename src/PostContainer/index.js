import React, { Component } from 'react';
import axios from 'axios';

require ('../App.css');

class PostContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			postTitle: '',
			postBody: '',
			posts: [],
			editPost: false,
			createPost: false,
			viewPost: false,
			activePosts: false,
			postToEdit: {
				postTitle: '',
				postBody: ''
			},
			postToView: {
				postTitle: '',
				postBody: '',
				comments: []
			}
		}
	}
	getPosts = async () => {
		const post = await fetch(process.env.REACT_APP_URL + '/post', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const parsedResponse = await post.json();
		return parsedResponse
	}
	componentDidMount() {
		this.getPosts().then(post => {
			if(post.status === 200) {
				let postArray = post.data.post
				this.setState({
					posts: postArray,
					username: post.data.username,
					activePosts: true
				})
			} else {
				console.log(post.status);
			}
		})
	}
	newPost = async () => {
		const post = 
	}
	render() {
		return (
			<div>
				<h1>Posts</h1>
			</div>
		)
	}
}


export default PostContainer;



