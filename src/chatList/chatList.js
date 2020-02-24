import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";
import fire from "../config/fire";

class ChatListComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			curAvatar: null
		};
	}

	render() {
		const { classes } = this.props;

		if (this.props.chats.length > 0) {
			return (
				<div className={classes.root}>
					<Button
						variant="contained"
						fullWidth
						color="primary"
						onClick={this.newChat}
						className={classes.newChatBtn}
					>
						Start chat
					</Button>
					<List>
						{this.props.chats.map((chat, index) => {
							// for each chat in chats
							// fire
							// 	.firestore()
							// 	.collection("users")
							// 	.doc(
							// 		chat.users.filter(
							// 			user => user !== this.props.userEmail // ignore own email
							// 		)[0]
							// 	)
							// 	.get()
							// 	.then(doc => {
							// 		this.setState({
							// 			curAvatar: doc.data().avatar ? doc.data().avatar : null
							// 		});
							// 	});
							//console.log(chat);
							let objEmail = chat.users
								.filter(
									user => user !== this.props.userEmail // ignore own email
								)[0]
								.split("")[0];
							var avatar = null;
							//console.log(objEmail > fire.auth().currentUser.email);
							if (objEmail > fire.auth().currentUser.email) {
								avatar = chat.avatars[0].avatar2;
								//console.log(avatar);
							} else {
								avatar = chat.avatars[0].avatar1;
								//console.log(avatar);
							}
							//console.log(avatar[0].avatar1);
							return (
								<div key={index}>
									<ListItem // create a list item
										onClick={() => this.selectChat(index)}
										className={classes.listItem}
										selected={this.props.selectedChatIndex === index}
										alignItems="flex-start"
									>
										<ListItemAvatar>
											<Avatar alt="Remy Sharp" src={avatar}>
												{
													// find first letter of name
													chat.users
														.filter(
															user => user !== this.props.userEmail // ignore own email
														)[0]
														.split("")[0]
												}
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={
												chat.users.filter(
													user => user !== this.props.userEmail
												)[0]
											}
											secondary={
												<React.Fragment>
													<Typography component="span" color="textPrimary">
														{// display the last 30 characters of the last message
														chat.messages[
															chat.messages.length - 1
														].message.substring(0, 30) + " ..."}
													</Typography>
												</React.Fragment>
											}
										/>
										{chat.receiverHasRead === false &&
										!this.userIsSender(chat) ? (
											<ListItemIcon>
												<NotificationImportant
													className={classes.unreadMessage}
												></NotificationImportant>
											</ListItemIcon>
										) : null}
									</ListItem>
									<Divider />
								</div>
							);
						})}
					</List>
				</div>
			);
		} else {
			// if theres no chats, just display the new chat button
			return (
				<div className={classes.root}>
					<Button
						variant="contained"
						fullWidth
						color="primary"
						onClick={this.newChat}
						className={classes.newChatBtn}
					>
						Create first chat
					</Button>
					<List></List>
				</div>
			);
		}
	}

	userIsSender = chat =>
		chat.messages[chat.messages.length - 1].sender === this.props.email;

	newChat = () => this.props.newChatBtnFn();

	selectChat = index => this.props.selectChatFn(index);
}

export default withStyles(styles)(ChatListComponent);
