import React, { Component } from 'react';
import { SketchField, Tools } from 'react-sketch';
import io from 'socket.io-client';

class Canvas extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     isMouseDown: false
        // }

        this._onMouseMove = this._onMouseMove.bind(this);
    }

    isMouseDown = false;

    // // creating a variable named socket
    socket;

    // componentDidMount() {
    //     this.socket = io.connect('http://localhost:4000')
    // }

    // when mouse is clicked
    _onMouseDown = (e) => {
        // this.setState({isMouseDown: true});
        this.isMouseDown = true;
    }

    // getting the X and Y positions when mouse is dragged, then send data to the socket
    _onMouseMove = (e) => {
        if(this.isMouseDown === true) {
            const width = this.refs.whiteboard.clientWidth;
            const height = this.refs.whiteboard.clientHeight;
            const oX = e.nativeEvent.offsetX;
            const oY = e.nativeEvent.offsetY;

            console.log(Math.floor(oX), Math.floor(oY));

            var data = { 
                x: oX,
                y: oY
            }

            // this.socket.emit('mouse', data);
        }
    }

    _onMouseUp = () => {
        // this.setState({isMouseDown: false});
        this.isMouseDown = false;
    }

    render() {

        return (
            <div className="whiteboard"
            onMouseMove={ this._onMouseMove }
            onMouseDown={ this._onMouseDown }
            onMouseUp={ this._onMouseUp }
            ref="whiteboard"
            >
                <SketchField
                width='975px'
                height='650px'
                tool={Tools.Pencil}
                lineColor='black'
                lineWidth={3}
                backgroundColor='#dcdde1'
                />
            </div>
        );
    }
}
export default Canvas;