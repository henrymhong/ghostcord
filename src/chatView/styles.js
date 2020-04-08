const styles = theme => ({
	content: {
		height: "calc(100vh - 100px)",
		overflow: "auto",
		padding: "25px",
		marginLeft: "300px",
		boxSizing: "border-box",
		overflowY: "scroll",
		top: "50px",
		width: "calc(100% - 300px)",
		position: "absolute"
	},
	userSender: {
		float: "right",
		clear: "both",
		boxSizing: "border-box",
		wordWrap: "break-word",
		marginLeft: "5px",
		marginTop: "10px",
		color: "black",
		width: "300px"
	},

	friendSender: {
		float: "left",
		clear: "both",
		boxSizing: "border-box",
		wordWrap: "break-word",
		marginLeft: "5px",
		marginTop: "10px",
		color: "black",
		width: "300px"
	},

	userSent: {
		float: "right",
		clear: "both",
		padding: "20px",
		boxSizing: "border-box",
		wordWrap: "break-word",
		marginTop: "10px",
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		color: "white",
		width: "300px",
		borderRadius: "10px"
	},

	friendSent: {
		float: "left",
		clear: "both",
		padding: "20px",
		boxSizing: "border-box",
		wordWrap: "break-word",
		marginTop: "10px",
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		color: "white",
		width: "300px",
		borderRadius: "10px"
	},

	chatHeader: {
		width: "calc(100% - 301px)",
		height: "50px",
		backgroundColor: "#344195",
		position: "fixed",
		marginLeft: "301px",
		fontSize: "18px",
		textAlign: "center",
		color: "white",
		paddingTop: "10px",
		boxSizing: "border-box"
	}
});

export default styles;
