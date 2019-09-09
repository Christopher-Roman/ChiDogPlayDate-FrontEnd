import React, { Component } from 'react';
import Posts from '../Posts'
import ViewPost from '../ViewPost'
import EditPost from '../EditPost'
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
				let postArray = post.data[0].post
				console.log(postArray);
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
	newPost = async (e) => {
		e.preventDefault();
		try {
			const post = await fetch(process.env.REACT_APP_URL + '/post/new', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					postTitle: this.state.postTitle,
					postBody: this.state.postBody
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const parsedResponse = await post.json()
			this.setState({
				posts: [...this.state.posts, parsedResponse.data],
				createPost: false
			})
		} catch(err) {
			console.log(err)
		}
	}
	viewPost = async (post) => {
		try {
			const selectedPost = await fetch(process.env.REACT_APP_URL + '/post/' + post._id, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type':'application/json'
				}
			})
			const parsedResponse = await selectedPost.json();
			return parsedResponse

		} catch(err) {
			console.log(err)
		}
	}
	viewPostToggle = (post) => {
		if(!this.state.viewPost) {
			this.setState({
				viewPost: true,
				activePosts: false,
				postToView: {
					...post
				}
			})
		} else {
			this.setState({
				viewPost: false,
				activePosts: true
			})
		}
	}
	editPostOpen = (post) => {
		this.setState({
			editPost: true,
			activePosts: false,
			postToEdit: {
				...post
			}
		})
	}
	editPostClose = (post) => {
		this.setState({
			editPost: false,
			activePosts: true
		})
	}
	handlePostEditChange = (e) => {
		this.setState({
			postToEdit: {
				...this.state.postToEdit,
				[e.currentTarget.name]: e.currentTarget.value
			}
		})
	}
	deletePost = async (id) => {
		try {
			const deletePost = await fetch(process.env.REACT_APP_URL + '/post/delete/' + id, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type':'application/json'
				}
			})
			const parsedResponse = await deletePost.json();
			let remainingPosts = parsedResponse.data.post
			console.log(remainingPosts);
			this.setState({
				posts: remainingPosts
			})
		} catch(err) {
			console.log(err)
		}
	}
	handleChange = (e) => {
	    this.setState({
	      [e.currentTarget.name]: e.currentTarget.value
	    })
  	}
	render() {
		return (
			<div>
				<h1>Posts</h1>
				{!this.state.editPost && !this.state.viewPost ?
					<form onSubmit={this.newPost}>
						<input name='postTitle' type='text' onChange={this.handleChange} />
						<input name='postBody' type='text' onChange={this.handleChange} />
						<button>submit</button>
					</form> 
				: null}
				{this.state.activePosts && !this.state.editPost && !this.state.viewPost ? 
					<Posts postInfo={this.state.posts} editPostOpen={this.editPostOpen} openPost={this.viewPostToggle} deletePost={this.deletePost} postInfo={this.state.posts} userInfo={this.props.userInfo} /> 
					: !this.state.activePosts && this.state.viewPost && !this.state.editPost ? <ViewPost userInfo={this.props.userInfo} closePost={this.viewPostToggle} postToView={this.state.postToView} /> 
					: this.state.editPost && !this.state.activePosts && !this.state.viewPost ? <EditPost userInfo={this.props.userInfo} postToView={this.state.postToEdit} handlePostEditChange={this.handlePostEditChange} postClose={this.editPostClose} postInfo={this.state.posts} /> 
					: null }
			</div>
		)
	}
}


export default PostContainer;



