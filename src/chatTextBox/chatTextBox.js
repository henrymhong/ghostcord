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

function buildFileSelector() {
	const fileSelector = document.createElement("input");
	fileSelector.setAttribute("type", "file");
	fileSelector.setAttribute("multiple", "multiple");
	return fileSelector;
}
const useStyles = makeStyles(theme => ({
	root: {
	  '& > *': {
		margin: theme.spacing(1),
	  },
	},
	input: {
	  display: 'none',
	},
  }));

class ChatTextBoxComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			chatText: ""
		};
	}
	componentDidMount() {
		this.fileSelector = buildFileSelector();
	}

	handleFileSelect = e => {
		e.preventDefault();
		this.fileSelector.click();
		alert(this.fileSelector.addEventListener);
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.chatTextBoxContainer}>
				<input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
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
			this.props.submitMessageFn(this.state.chatText);
			document.getElementById("chattextbox").value = "";
		}
	};
}

export default withStyles(styles)(ChatTextBoxComponent);
