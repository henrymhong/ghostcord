import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';



export default class VideoRoomComponent extends Component {
    
    constructor(props) {
        super(props);
        this.localVideoref = React.createRef();
    }
    render() {

        const constraints = {
            'video': true,
            'audio': true
        }

        navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            console.log('Got MediaStream:', stream);
        })
        .catch(error => {
            console.error('Error accessing media devices.', error);
        });

        return (
            <div>
                <video ref={this.localVideoref} autoPlay></video>
            </div>
        );
    }
}
