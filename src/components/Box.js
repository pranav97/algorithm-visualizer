import React from 'react';
import './Box.css';

class Box extends React.Component {
    colorHashes = {
        'blue': "#A2BCE0",
        'green': "#0B5563",
        'red': '#993955',
        'white': "#E9ECF5"
    }
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
    getColor() {
        if (this.props.backgroundColor in this.colorHashes) {
            return this.colorHashes[this.props.backgroundColor];
        }
        else {
            return this.props.backgroundColor; 
        }
    }
    render() {
      return (
        <div 
            style={{
                backgroundColor: this.getColor()
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
  
  