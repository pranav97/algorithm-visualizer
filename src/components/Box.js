import React from 'react';
import './Box.css';

class Box extends React.Component {
    onClick() {
        // must be arrow function to get the thing to work as expected with click
        console.log("clicked box");
    }
    render() {
      return (
        <div className="box" onClick={this.onClick}>
        </div>
      );
    }
}

export default Box;
  
  