import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(5, 15),
      width: theme.spacing(100),
      height: theme.spacing(100),
	},
	paper: {
		display: 'flex',
		margin: theme.spacing(5,5),
	}
  },
}));

export default function SimplePaper() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    	<Paper elevation={5}>
			<Avatar className={classes.paper}/>
		</Paper>
    </div>
  );
}