import React, { Component, Fragment } from 'react'
import styles from "./styles";
import './styles.css';
import withStyles from "@material-ui/core/styles/withStyles";
import { Button } from '@material-ui/core';
import Canvas from './canvas';

class WhiteBoardComponent extends Component {    
    render() {
        return (
            <Fragment>
                <h3 style={{ textAlign: 'center' }}>Welcome to the Whiteboard</h3>
                <div className="main">
                    <div className="color-guide">
                        <h5>Color Guide</h5>
                        <div className="user user">User</div>
                        <div className="user guest">Guest</div>
                        <div>
                            <Button 
                                variant="contained" 
                                color="primary"  
                                fullWidth
                                onClick={() => this.props.history.push("/dashboard")}
                            >
                                Home
                            </Button>
                        </div>
                    </div>
                    <Canvas />
                </div>
            </Fragment>
        );
    }
}

export default withStyles(styles)(WhiteBoardComponent);
