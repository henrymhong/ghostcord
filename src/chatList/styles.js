import grey from '@material-ui/core/colors/grey';
const darkGrey = grey[700]

const styles = theme => ({
	root: {
		//backgroundColor: theme.palette.background.paper,
		overflow: "auto",
		overflowY: "scroll",
		// backgroundColor: "theme.palette.background.paper",
		backgroundColor: darkGrey,
		height: "calc(100% - 68px)",
		position: "absolute",
		left: "0",
		width: "300px",
		boxShadow: "0px 0px 2px black"
	},
	listItem: {
		cursor: "pointer"
	},
	newChatBtn: {
		borderRadius: "0px"
	},
	unreadMessage: {
		color: "red",
		position: "absolute",
		top: "0",
		right: "5px"
	}
});

export default styles;
