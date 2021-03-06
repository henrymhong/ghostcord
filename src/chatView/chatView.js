import React from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import AttachmentIcon from '@material-ui/icons/Attachment';
import Button from '@material-ui/core/Button';
import fire from "../config/fire";

class ChatViewComponent extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			message: ''
		}
		this.name = ""
	}
	componentDidMount = () => {
		const container = document.getElementById("chatview-container");
		if (container) container.scrollTo(0, container.scrollHeight); // scroll to to the bottom
	};
	componentDidUpdate = () => {
		const container = document.getElementById("chatview-container");
		if (container) container.scrollTo(0, container.scrollHeight);
	};

	render() {
		const { classes } = this.props;
		
		if (this.props.chat === undefined) {
			return <main className={classes.content}></main>;
		} else if (this.props.chat !== undefined) {
			const e = this.props.chat.users.filter(
				usr => usr !== this.props.userEmail
			)[0]
			this.name = e
			return (
				<div>
					<div className={classes.chatHeader}>
						{/* <Avatar alt="Remy Sharp">
							{
								// find first letter of name
								this.props.chat.users
									.filter(
										_usr => _usr !== this.props.email
									)[0]
									.split("")[0]
							}
						</Avatar> */}
						
						{this.name}
						{/*
						<div className={classes.avatar}>
							<ExampleComponent
								image={this.props.chat.avatars.avatar1}
								roundedColor="#321124"
								imageWidth="150"
								imageHeight="150"
								roundedSize="13"
							/>
						</div>
						*/}
					</div>
					<main id="chatview-container" className={classes.content}>
						{this.props.chat.messages.map((msg, index) => {
							// map all messages
							return (
								<div>
									<div
									key={index}
										className={
											// if user sent it give it user sent class, and otherwise for friend
											msg.sender === this.props.userEmail
												? classes.userSender
												: classes.friendSender
										}
									>
										{msg.sender === this.props.userEmail &&
											<div>
												{'You'}
											</div>
										}
										{msg.sender !== this.props.userEmail &&
											<div>
												{msg.sender}
											</div>
										}
									</div>
									<div
										key={index}
										className={
											// if user sent it give it user sent class, and otherwise for friend
											msg.sender === this.props.userEmail
												? classes.userSent
												: classes.friendSent
										}
									>
										{msg.type === 0 &&
											<div style={{ fontSize: "15px", width: '250px'}}>
												{msg.message}
											</div>
										}
										{msg.type === 1 &&
											<div>
												<img
												style={{width: '100%', height: '300px'}}
                                    			src={msg.message}
                                    			alt= "cannot load image"
                                				/>
											</div>
										}
										{msg.type === 2 &&
											<div>
												<Button 
													href={msg.message}
													target="_blank" //open attachment in a new tab
													variant="outlined" 
													color="primary"
													className={classes.button}
													startIcon={<AttachmentIcon />}
												>
													{msg.fileName}
												</Button>
											</div>
										}
										<div style={{ fontSize: "10px", paddingTop: 5 }}>
											{new Date(msg.timestamp).toLocaleString()}
										</div>
									</div>
								</div>

							);
						})}
					</main>
				</div>
			);
		} else {
			return <div className="chatview-container">Loading...</div>;
		}
	}
	renderMsg = (msg) => {
		
	}
}

export default withStyles(styles)(ChatViewComponent);
