import React from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";

class ChatViewComponent extends React.Component {
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
						{
							this.props.chat.users.filter(
								_usr => _usr !== this.props.email
							)[0]
						}
					</div>
					<main id="chatview-container" className={classes.content}>
						{this.props.chat.messages.map((msg, index) => {
							// map all messages
							return (
								<div
									key={index}
									className={
										// if user sent it give it user sent class, and otherwise for friend
										msg.sender === this.props.user
											? classes.userSent
											: classes.friendSent
									}
								>
									{msg.message}
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
}

export default withStyles(styles)(ChatViewComponent);
