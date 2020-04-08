import React from "react";
import NewChatComponent from "../newChat/newChat";
import ChatListComponent from "../chatList/chatList";
import ChatViewComponent from "../chatView/chatView";
import ChatTextBoxComponent from "../chatTextBox/chatTextBox";
import styles from "./styles";
import { Button, withStyles } from "@material-ui/core";
import fire from "../config/fire";
import firebase from "firebase/app";

class DashboardComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedChat: null, // index of which chat is currently selected in dashboard
			newChatFormVisible: false, // show or hide the create a chat function
			email: null,
			friends: [],
			chats: []
		};
	}

	render() {
		const { classes } = this.props;

		if (this.state.email) {
			return (
				<div className="dashboard-container" id="dashboard-container">
					<ChatListComponent
						history={this.props.history}
						userEmail={this.state.email}
						selectChatFn={this.selectChat}
						chats={this.state.chats}
						selectedChatIndex={this.state.selectedChat}
						newChatBtnFn={this.newChatBtnClicked}
					></ChatListComponent>
					{this.state.newChatFormVisible ? null : (
						<ChatViewComponent
							userEmail={this.state.email}
							chat={this.state.chats[this.state.selectedChat]}
						></ChatViewComponent>
					)}
					{this.state.selectedChat !== null &&
					!this.state.newChatFormVisible ? (
						<ChatTextBoxComponent
							userClickedInputFn={this.messageRead}
							submitMessageFn={this.submitMessage}
						></ChatTextBoxComponent>
					) : null}
					{this.state.newChatFormVisible ? (
						<NewChatComponent
							goToChatFn={this.goToChat}
							newChatSubmitFn={this.newChatSubmit}
						></NewChatComponent>
					) : null}
					<Button
						onClick={() => this.props.history.push("/about")}
						className={classes.aboutBtn}
					>
						About
					</Button>
					<Button
						onClick={() => this.props.history.push("/friends")}
						className={classes.friendsBtn}
					>
						Friends
					</Button>
					<Button
						onClick={() => this.props.history.push("/whiteboard")}
						className={classes.whiteboardBtn}
					>
						White Board
					</Button>
					<Button
						onClick={() => this.props.history.push("/profile")}
						className={classes.profileBtn}
					>
						Profile
					</Button>
					<Button onClick={this.signOut} className={classes.signOutBtn}>
						Sign Out
					</Button>
				</div>
			);
		} else {
			return <div>Loading....</div>;
		}
	}

	signOut = () => fire.auth().signOut();

	submitMessage = (msg,Type) => {
		const docKey = this.makeChatID(
			this.state.chats[this.state.selectedChat].users.filter(
				_usr => _usr !== this.state.email
			)[0]
		);
		fire
			.firestore()
			.collection("chats")
			.doc(docKey)
			.update({
				messages: firebase.firestore.FieldValue.arrayUnion({
					sender: this.state.email,
					message: msg,
					timestamp: Date.now(),
					type: Type
				}),
				receiverHasRead: false
			});
	};

	// Puts the users together in alphabetical order
	makeChatID = friend => [this.state.email, friend].sort().join(":");

	newChatBtnClicked = () =>
		this.setState({ newChatFormVisible: true, selectedChat: null });

	newChatSubmit = async chatObj => {
		const docKey = this.makeChatID(chatObj.sendTo);
		let av1 = null;
		let av2 = null;
		if (docKey.split(":")[0] === this.state.email) {
			av1 = await fire
				.firestore()
				.collection("users")
				.doc(this.state.email)
				.get()
				.then(res => {
					return res.data().avatar ? res.data().avatar : null;
				});
			av2 = await fire
				.firestore()
				.collection("users")
				.doc(chatObj.sendTo)
				.get()
				.then(res => {
					return res.data().avatar ? res.data().avatar : null;
				});
		} else {
			av1 = await fire
				.firestore()
				.collection("users")
				.doc(chatObj.sendTo)
				.get()
				.then(res => {
					return res.data().avatar ? res.data().avatar : null;
				});
			av2 = await fire
				.firestore()
				.collection("users")
				.doc(this.state.email)
				.get()
				.then(res => {
					return res.data().avatar ? res.data().avatar : null;
				});
		}
		await fire
			.firestore()
			.collection("chats")
			.doc(docKey)
			.set({
				messages: [
					{
						message: chatObj.message,
						sender: this.state.email,
						timestamp: Date.now(),
						type: chatObj.type
					}
				],
				users: [this.state.email, chatObj.sendTo],
				//users: [this.state.email, chatObj.sendTo],
				receiverHasRead: false,
				avatars: [
					{
						avatar1: av1,
						avatar2: av2
					}
				]
			});
		this.setState({ newChatFormVisible: false });
		this.selectChat(this.state.chats.length - 1);
	};

	selectChat = async chatIndex => {
		await this.setState({
			selectedChat: chatIndex,
			newChatFormVisible: false
		});
		this.messageRead();
	};

	goToChat = async (docKey, msg) => {
		const usersInChat = docKey.split(":");
		const chat = this.state.chats.find(_chat =>
			usersInChat.every(_user => _chat.users.includes(_user))
		);
		this.setState({ newChatFormVisible: false });
		await this.selectChat(this.state.chats.indexOf(chat));
		this.submitMessage(msg);
	};

	// Chat index could be different than the one we are currently on in the case
	// that we are calling this function from within a loop such as the chatList.
	// So we will set a default value and can overwrite it when necessary.
	messageRead = () => {
		const chatIndex = this.state.selectedChat;
		const docKey = this.makeChatID(
			this.state.chats[chatIndex].users.filter(
				_usr => _usr !== this.state.email
			)[0]
		);
		if (this.clickedMessageWhereNotSender(chatIndex)) {
			fire
				.firestore()
				.collection("chats")
				.doc(docKey)
				.update({ receiverHasRead: true });
		} else {
			console.log("Clicked message where the user was the sender");
		}
	};

	clickedMessageWhereNotSender = chatIndex =>
		this.state.chats[chatIndex].messages[
			this.state.chats[chatIndex].messages.length - 1
		].sender !== this.state.email;

	componentWillMount = () => {
		fire.auth().onAuthStateChanged(async usr => {
			// check current user auth state
			if (!usr) this.props.history.push("/login");
			// move to login if no user
			else {
				// otherwise check user arrays of chats with current user email
				await fire
					.firestore()
					.collection("chats")
					.where("users", "array-contains", usr.email)
					.onSnapshot(async result => {
						// anytime there is an update in database, call this to update chat list
						const chats = result.docs.map(doc => doc.data());
						await this.setState({
							email: usr.email, // set the current user email
							chats: chats, // set chats in state
							friends: []
						});
					});
			}
		});
	};
}

export default withStyles(styles)(DashboardComponent);
