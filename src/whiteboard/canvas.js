import React, { Component } from 'react';
import { SketchField, Tools } from 'react-sketch';
import io from 'socket.io-client';

class Canvas extends Component {

    // constructor(props) {
    //     super(props);

    //     this.state = { x: 0, y: 0 };

    //     this.mouseDragged = this.mouseDragged.bind(this);
    // }

    // // creating a variable named socket
    // socket;

    // componentDidMount() {
    //     this.socket = io.connect('http://localhost:4000')
    // }

    // // getting the X and Y positions when mouse is dragged, then send data to the socket
    // mouseDragged(e) {
    //     console.log('mouse dragging...');
    //     this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    //     console.log('Sending: ' + this.state.x + ', ' + this.state.y);

    //     this.socket.emit('mouse', data);
    // }
    
    render() {
        return (
            <SketchField
            width='1024px'
            height='768px'
            tool={Tools.Pencil}
            lineColor='black'
            lineWidth={3}
            backgroundColor='#dcdde1'
            />
        );
    }
}
export default Canvas;