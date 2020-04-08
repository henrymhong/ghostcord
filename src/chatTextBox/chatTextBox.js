import React from "react";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";
import Attach from "@material-ui/icons/PhotoSizeSelectActual";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import fire, { db } from "../config/fire";


class ChatTextBoxComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			chatText: "",
			
		}
		this.image = null
		
	}
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.chatTextBoxContainer}>
				<input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-photo"
                    onChange={this.onChoosePhoto}
					type="file"
					style={{ display: 'none', }}
                />
                <label htmlFor="icon-button-photo">
                    <IconButton color="primary" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
				<TextField
					placeholder="Type your message.."
					onKeyUp={e => this.userTyping(e)}
					id="chattextbox"
					className={classes.chatTextBox}
					onFocus={this.userClickedInput}
				></TextField>
				<Send onClick={this.submitMessage} className={classes.sendBtn}></Send>
			</div>
		);
	}
	userTyping = e =>
		e.keyCode === 13
			? this.submitMessage()
			: this.setState({ chatText: e.target.value });
	messageValid = txt => txt && txt.replace(/\s/g, "").length;
	userClickedInput = () => this.props.userClickedInputFn();
	submitMessage = () => {
		if (this.messageValid(this.state.chatText)) {
			this.props.submitMessageFn(this.state.chatText,0);
			document.getElementById("chattextbox").value = "";
		}
	};
	submitPictureMessage = () => {
		if (this.messageValid(this.state.chatText)) {
			this.props.submitMessageFn(this.state.chatText,1);
			document.getElementById("chattextbox").value = "";
		}
	};
	onChoosePhoto = event => {
        if (event.target.files && event.target.files[0]) {
            this.image = event.target.files[0];
           	this.uploadPhoto()
        } else {
            this.setState({chatText: ''})
        }
	}
	uploadPhoto = () => {
		if (this.image) {
			const uploadTask = db.ref(`images/${this.image.name}`).put(this.image);
			console.log("updating picture");
			uploadTask.on(
				"state_changed",
				snapshot => {},
				error => {
					console.log(error);
				},
				() => {
					db
						.ref("images")
						.child(this.image.name)
						.getDownloadURL()
						.then(url => {
							this.setState({ url });
							// storing in firebase
							this.setState({chatText : url})
							this.submitPictureMessage()
						});
				}
			);
	
			alert("photo sent!");
		}

	}
}

export default withStyles(styles)(ChatTextBoxComponent);
