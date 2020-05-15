// import React, { Component } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import styles from "./styles";
// import withStyles from "@material-ui/core/styles/withStyles";
// import fire from "../config/fire";
// import { Link, withRouter } from "react-router-dom";
// import Burger from "../burger/burger";
// //import { connect } from 'react-redux';

// class navBar extends Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         const { classes } = this.props;

//         return (
//             <div className={classes.root}>
//                 <AppBar position="static" className={classes.color}>
//                     <Toolbar>
                        // <Link
                        //     variant="h9"
                        //     className={classes.title}
                        //     to="/dashboard"
                        // >
                        //     <img
                        //         src={require("../logo/logo.png")}
                        //         alt="Ghostcord"
                        //         className={classes.logo}
                        //     />
                        // </Link>
//                         <Typography variant="h9" className={classes.title}>
//                             <Link
//                                 variant="h9"
//                                 className={classes.title}
//                                 to="/video"
//                             >
//                                 Video
//                             </Link>
//                         </Typography>
//                         <Typography variant="h9" className={classes.title}>
                            // <Link
                            //     variant="h9"
                            //     className={classes.title}
                            //     to="/whiteboard"
                            // >
                            //     Whiteboard
                            // </Link>
//                         </Typography>
//                         <Typography variant="h9" className={classes.title}>
                            // <Link
                            //     variant="h9"
                            //     className={classes.title}
                            //     to="/friends"
                            // >
                            //     Friends
                            // </Link>
//                         </Typography>

//                         <Typography variant="h9" className={classes.title}>
                            // <Link
                            //     variant="h9"
                            //     className={classes.title}
                            //     to="/profile"
                            // >
                            //     Profile
                            // </Link>
//                         </Typography>
//                         <Typography variant="h9" className={classes.title}>
                            // <Link
                            //     variant="h9"
                            //     className={classes.title}
                            //     to="/about"
                            // >
                            //     About
                            // </Link>
//                         </Typography>
//                         <Button
//                             variant="h9"
//                             className={classes.title}
                            // onClick={this.signOut}
//                         >
//                             Logout
//                         </Button>
//                     </Toolbar>
//                 </AppBar>
//             </div>
//         );
//     }

//     signOut = () => {
//         fire.auth().signOut();
//         this.props.history.push("/login");
//     };
// }
// // export default withRouter(connect()(withStyles(styles)(navBar)));
// export default withStyles(styles)(navBar);

import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import GestureIcon from '@material-ui/icons/Gesture';
import PeopleIcon from '@material-ui/icons/People';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InfoIcon from '@material-ui/icons/Info';
import { Link, withRouter } from "react-router-dom";
import fire from "../config/fire";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#184a46'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
        color: '#184a46'
    }
  },
}));

export default function PersistentDrawerRight() {

        const classes = useStyles();
        const theme = useTheme();
        const [open, setOpen] = React.useState(false);
        
        const handleDrawerOpen = () => {
            setOpen(true);
        };
        
        const handleDrawerClose = () => {
            setOpen(false);
        };

        const signOut = () => {
          fire.auth().signOut();
          this.props.history.push("/login");
        };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        // position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}

      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
                <Link
                variant="h9"
                className={classes.title}
                to="/dashboard"
                >
                <img
                    height="50px"
                    width="50px"
                    src={require("../logo/logo.png")}
                    alt="Ghostcord"
                    className={classes.logo}
                />
                </Link>

          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem>
                <ListItemIcon>
                    <VideoCallIcon />
                </ListItemIcon>
                <ListItemText>
                    <Link
                        variant="h9"
                        className={classes.link}
                        to="/video"
                    >
                        Video
                    </Link>
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <GestureIcon />
                </ListItemIcon>
                <ListItemText>
                    <Link   
                        variant="h9"
                        className={classes.link}
                        to="/whiteboard"
                    >
                        Whiteboard
                    </Link>
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText>
                    <Link
                        variant="h9"
                        className={classes.link}
                        to="/friends"
                    >
                        Friends
                    </Link>
                </ListItemText>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText>
                    <Link
                        variant="h9"
                        className={classes.link}
                        to="/profile"
                    >
                        Profile
                    </Link>
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <InfoIcon />
                </ListItemIcon>
                <ListItemText>
                    <Link
                        variant="h9"
                        className={classes.link}
                        to="/about"
                    >
                        About
                    </Link>
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link 
                   variant="h9"
                   className={classes.link}
                   >
                    <span onClick={signOut}>
                      Logout
                    </span>
                   </Link>
                </ListItemText>
            </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
// }
// export default navBar;