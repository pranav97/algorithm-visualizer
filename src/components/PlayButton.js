import React from 'react';
import './PlayButton';

class PlayButton extends React.Component {
    getIconState = () => {
        return this.props.icon + " icon";
    }
    startStop = () => {
        return this.props.labelText;
    }
    onClick = () => {
        this.props.onPlayPause();
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
            <div className='play-button' style={{ visibility: this.getStyle()}}>
                <button className="ui labeled icon button">
                    <i 
                        onClick={this.onClick}
                        className={this.getIconState()}></i>
                    {this.startStop()}
                </button>
            </div>
        );
    }
}
export default PlayButton;