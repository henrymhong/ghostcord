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
import images from '../Themes/Images'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './chatTextBox.css'
import AttachmentIcon from '@material-ui/icons/Attachment';



class ChatTextBoxComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			chatText: "",
			isShowSticker: false
		}
		this.image = null
		this.attachment = null
		this.fileName = null
		
	}
	handleToggle = ()=> {
		alert("Click!");
	}
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.chatTextBoxContainer}>
				{/* Stickers */}
                {this.state.isShowSticker ? this.renderStickers() : null}
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
				<IconButton color="primary" component="span" onClick={() => this.renderStickers}>
                    <InsertEmoticonIcon/>
                </IconButton>
				<input
                    accept="media_type"
                    className={classes.input}
                    id="icon-button-attachment"
                    onChange={this.onChooseAttachment}
					type="file"
					style={{ display: 'none', }}
                />
				<label htmlFor="icon-button-attachment">
					<IconButton color="primary" component="span">
						<AttachmentIcon/>
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
	openListSticker = () => {
        this.setState({isShowSticker: !this.state.isShowSticker})
    }
	renderStickers = () => {
        return (
            <div className="viewStickers">
                <img
                    className="imgSticker"
                    src={images.mimi1}
                    alt="sticker"
                    onClick={() => this.onSendMessage('mimi1', 2)}
                />
                <img
                    className="imgSticker"
                    src={images.mimi2}
                    alt="sticker"
                    onClick={() => this.onSendMessage('mimi2', 2)}
                />
                <img
                    className="imgSticker"
                    src={images.mimi3}
                    alt="sticker"
                    onClick={() => this.onSendMessage('mimi3', 2)}
                />
                <img
                    className="imgSticker"
                    src={images.mimi4}
                    alt="sticker"
                    onClick={() => this.onSendMessage('mimi4', 2)}
                />
                <img
                    className="imgSticker"
                    src={images.mimi5}
                    alt="sticker"
                    onClick={() => this.onSendMessage('mimi5', 2)}
                />
                <img
                    className="imgSticker"
                    src={images.mimi6}
                    alt="sticker"
                    onClick={() => this.onSendMessage('mimi6', 2)}
                />
                <img
                    className="imgSticker"
                    src={images.mimi7}
                    alt="sticker"
                    onClick={() => this.onSendMessage('mimi7', 2)}
                />
                <img
                    className="imgSticker"
                    src={images.mimi8}
                    alt="sticker"
                    onClick={() => this.onSendMessage('mimi8', 2)}
                />
                <img
                    className="imgSticker"
                    src={images.mimi9}
                    alt="sticker"
                    onClick={() => this.onSendMessage('mimi9', 2)}
                />
            </div>
        )
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
			this.props.submitMessageFn(this.state.chatText,1,this.fileName);
			document.getElementById("chattextbox").value = "";
		}
	};
	onChoosePhoto = event => {
        if (event.target.files && event.target.files[0]) {
			this.image = event.target.files[0];
			this.fileName = this.image.name
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
	onChooseAttachment = event => {
        if (event.target.files && event.target.files[0]) {
			this.attachment = event.target.files[0];
			this.fileName = this.attachment.name
           	this.uploadAttachment()
        } else {
            this.setState({chatText: ''})
        }
	}
	uploadAttachment = () => {
		if (this.attachment) {
			const uploadTask = db.ref(`attachments/${this.attachment.name}`).put(this.attachment);
			console.log("updating attachment");
			uploadTask.on(
				"state_changed",
				snapshot => {},
				error => {
					console.log(error);
				},
				() => {
					db
						.ref("attachments")
						.child(this.attachment.name)
						.getDownloadURL()
						.then(url => {
							this.setState({ url });
							// storing in firebase
							this.setState({chatText : url})
							this.submitAttachmentMessage()
						});
				}
			);
	
			alert("attachment sent!");
		}

	}
	submitAttachmentMessage = () => {
		if (this.messageValid(this.state.chatText)) {
			this.props.submitMessageFn(this.state.chatText,2,this.fileName);
			document.getElementById("chattextbox").value = "";
		}
	};
}


export default withStyles(styles)(ChatTextBoxComponent);
