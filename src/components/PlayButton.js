import React from 'react';
import './PlayButton.css';

class PlayButton extends React.Component {
    getIconState = () => {
        return this.props.icon + " icon";
    }
    startStop = () => {
        return this.props.labelText;
    }
    onClick = () => {
        this.props.onClick();
    }

    getStyle = () => {
        var style = "visible";
        if (this.props.visible === true) {
            style = "hidden"
        };
        return style;
    }

    render () {
        return (
            <div 
                onClick={this.onClick}
                className='play-button' style={{ visibility: this.getStyle()}}>
                <button className="ui labeled icon button">
                    <i 
                        className={this.getIconState()}></i>
                    {this.startStop()}
                </button>
            </div>
        );
    }
}
export default PlayButton;