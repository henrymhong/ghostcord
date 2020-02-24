import createSpacing from "@material-ui/core/styles/createSpacing";

const styles = theme => ({
	sendBtn: {
		color: "blue",
		cursor: "pointer",
		"&:hover": {
			color: "gray"
		}
	},
	attachBtn: {
		color: "black",
		cursor: "pointer",
		"&:hover": {
			color: "gray"
		}
	},
	chatTextBoxContainer: {
		position: "absolute",
		bottom: "15px",
		left: "315px",
		boxSizing: "border-box",
		overflow: "auto",
		width: "calc(100% - 300px - 50px)"
	},

	chatTextBox: {
		width: "calc(100% - 50px)"
	}
});

export default styles;
