const styles = theme => ({
    main: {
		width: "auto",
		display: "block", // Fix IE 11 issue.
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		[theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
			width: 400,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
			3
		)}px`
	},
	form: {
		width: "100%",
		marginTop: theme.spacing()
	},
	submit: {
		marginTop: theme.spacing(3)
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    }
});

export default styles;