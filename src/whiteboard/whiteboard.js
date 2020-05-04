import React, { Component, Fragment } from 'react'
import styles from "./styles";
import './styles.css';
import withStyles from "@material-ui/core/styles/withStyles";
import { Button } from '@material-ui/core';
import Canvas from './canvas';
import NavBarComponent from "../navBar/navBar";

class WhiteBoardComponent extends Component {    
    render() {
        return (
            <Fragment>
                <NavBarComponent />
                <h3 style={{ textAlign: 'center' }}>Welcome to the Whiteboard</h3>
                <div className="main">
                    <div className="color-guide">
                        <h5>Color Guide</h5>
                        <div className="user user">You</div>
                        <div className="user guest">Guest</div>
                    </div>
                    <Canvas />
                </div>
            </Fragment>
        );
    }
}

export default withStyles(styles)(WhiteBoardComponent);
