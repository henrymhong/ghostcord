import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import styles from './styles';
import withStyles from "@material-ui/core/styles/withStyles";
import fire from "../config/fire";
import { Link, withRouter } from "react-router-dom";
//import { connect } from 'react-redux';


class navBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
		const { classes } = this.props;

        return (
            <div className={classes.root}>
            <AppBar position="static" className={classes.color}>
              <Toolbar>
                  <Link variant="h6" className={classes.title} to="/dashboard">
                    <img src={require('../logo/logo.png')} alt="Ghostcord" className={classes.logo} /> 
                  </Link>
                <Typography variant="h6" className={classes.title}>
                    <Link  variant="h6" className={classes.title} to="/whiteboard">Whiteboard</Link>
                </Typography>
                <Typography variant="h6" className={classes.title}> 
                    <Link variant="h6" className={classes.title} to="/friends">Friends</Link>
                </Typography>
                <Typography variant="h6" className={classes.title}> 
                    <Link variant="h6" className={classes.title} to="/about">About</Link>
                </Typography>
                <Typography variant="h6" className={classes.title}>
                    <Link variant="h6" className={classes.title} to="/profile">Profile</Link>
                </Typography>
                <Button variant="h6" className={classes.title} onClick={this.signOut} >Logout</Button>
              </Toolbar>
            </AppBar>
          </div>
        )
    }

	signOut = () => fire.auth().signOut();

}
// export default withRouter(connect()(withStyles(styles)(navBar)));
export default withStyles(styles)(navBar);

