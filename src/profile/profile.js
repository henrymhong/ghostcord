import React, { Component } from 'react';
import {storage} from '../config/fire';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(5, 15),
      width: theme.spacing(100),
      height: theme.spacing(100),
	},
	paper: {
		display: 'flex',
		margin: theme.spacing(5,5),
	}
  },
}));

// export default function SimplePaper() {
// 	const classes = useStyles();
//   return (
//     <div className={classes.root}>
//     	<Paper elevation={5}>
// 				<Avatar className={classes.paper}/>
// 		</Paper>
//     </div>
//   );
// }

export default class ProfileComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			image: null,
			url: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
	}

	handleChange = e => {
		if(e.target.files[0]) {
			const image = e.target.files[0];
			this.setState(() => ({ image }));
		}
	}

	handleUpload = () => {
		const {image} = this.state;
		const uploadTask = storage
							.ref(`images/${image.name}`)
							.put(image);
		uploadTask.on('state_changed', 
			(snapshot) => {

			}, 
			(error) => {
				console.log(error);
			}, 
			() => {
				storage.ref('images').child(image.name).getDownloadURL().then(url => {

					console.log(url);
					this.setState({url});
				})
			});
	}

	render() {
		return (
			<div>
				<h1>Profile</h1>
				<input type="file" onChange={ this.handleChange }/>
				<button onClick={this.handleUpload} >Set Profile Picture</button>
				<br/>
				<img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded Image" width="400" height="300" />
			</div>
		);
	}
}