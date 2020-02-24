import React, { Component } from 'react';
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";

class VideoRoomComponent extends Component {
    
    constructor(props) {
        super(props);

        this.localVideoref = React.createRef();
        this.remoteVideoref = React.createRef();
    }

    componentDidMount() {
        //change later
        const pc_config = null;

        this.pc = new RTCPeerConnection(pc_config);

        this.pc.onicecandidate = (e) => {
            if (e.candidate) console.log(JSON.stringify(e.candidate));
        }

        this.pc.oniceconnectionstatechange = (e) => {
            console.log(e);
        }

        this.pc.onaddstream = (e) => {
            this.remoteVideoref.current.srcObject = e.stream;
        }
        const constraints = {
            'video': true
            //'audio': true
        }
        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                console.log('Got MediaStream:', stream);
                this.localVideoref.current.srcObject = stream;
                this.pc.addStream(stream);
            })
            .catch(error => {
                console.error('Error accessing media devices.', error);
            });
    }

    createOffer = () => {
        console.log('Offer')
        this.pc.createOffer({offerToReceiveVideo: 1})
            .then(sdp => {
                console.log(JSON.stringify(sdp))
                this.pc.setLocalDescription(sdp)
            }, e => {})
    }

    setRemoteDescription = () => {
        const desc = JSON.parse(this.textref.value);
        this.pc.setRemoteDescription(new RTCSessionDescription(desc));
    }

    createAnswer = () => {
        console.log('Answer');
        this.pc.createAnswer({offerToReceiveVideo: 1}).then(sdp => {
            console.log(JSON.stringify(sdp));
            this.pc.setLocalDescription(sdp)
        }, e => {})
    }

    addCandidate = () => {
        const candidate = JSON.parse(this.textref.value)
        console.log('Adding Candidate:', candidate);

        this.pc.addIceCandidate(new RTCIceCandidate(candidate))
    }
    

    render() {
        const { classes } = this.props;

        return (
            <div>
                <video 
                    className={classes.video} 
                    ref={this.localVideoref} 
                    autoPlay></video>
                <video 
                    className={classes.video} 
                    ref={this.remoteVideoref} 
                    autoPlay></video>
                <br />
                <button onClick={this.createOffer}>Offer</button>
                <button onClick={this.createAnswer}>Answer</button>
                <br/>
                <textarea ref={ref => {this.textref = ref}}/>
                <br />
                <button onClick={this.setRemoteDescription}>Set Remote Desc</button>
                <button onClick={this.addCandidate}>Add Candidate</button>
            </div>
        );
    }
}

export default withStyles(styles)(VideoRoomComponent);