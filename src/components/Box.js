import React from 'react';
import './Box.css';

class Box extends React.Component {
    colorHashes = {
        'blue': "#A2BCE0",
        'green': "#0B5563"
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
  
  