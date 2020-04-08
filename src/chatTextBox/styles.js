//import createSpacing from "@material-ui/core/styles/createSpacing";

const styles = theme => ({
	sendBtn: {
		color: "blue",
		cursor: "pointer",
		"&:hover": {
			color: "gray"
		}
	},
	viewInputGallery: {
		opacity: "0",
		position: "absolute",
		width: "30px"
	},
	chatTextBoxContainer: {
		position: "absolute",
		bottom: "15px",
		left: "315px",
		boxSizing: "border-box",
		overflow: "auto",
		width: "calc(100% - 300px - 50px)"
	},
	viewInputGallery: {
		opacity: 0,
		position: "absolute",

		left: "10px",
		width: "30px !important" 
	},

	chatTextBox: {
		width: "calc(100% - 200px)"
	}
});

export default styles;
