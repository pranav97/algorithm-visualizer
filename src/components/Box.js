import React from 'react';
import './Box.css';

class Box extends React.Component {
    colorHashes = {
        'blue': "#007EA7",
        'green': "#21897E"
    }
    // onClick() {
    //     // must be arrow function to get the thing to work as expected with click
    //     // console.log("clicked box");
    // }
    onMouseDown = () => {
        this.props.mouseDown(
            {
                row:this.props.rowNumber, 
                col:this.props.colNumber
            }
        );
    }
    onMouseUp = () => {
        this.props.onMouseUp(
            {
                row:this.props.rowNumber, 
                col:this.props.colNumber
            }
        );
    }
    render() {
      return (
        <div 
            style={{
                backgroundColor: this.colorHashes[this.props.backgroundColor]
            }}
            className="box" 
            // onClick={this.onClick}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            >
        </div>
      );
    }
}

export default Box;
  
  