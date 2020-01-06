import React from 'react';
import Help from './Help';
import './SpeedSlider.css';

class SpeedSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState()
    }
    getInitialState = () => {
        return {value: this.props.defaultValue};
    }
    handleChange = (event) => {
        this.setState({value: event.target.value});
        this.props.updateSpeed(event.target.value);
    }

    render() {
        return (
            <div className='speed-slider'>
                <label className="label-delay">Delay: 100ms  </label>
                <input
                    className='speed-input'
                    onChange={this.handleChange} 
                    type="range" id="start" name="delay"
                    min="0" 
                    max="5" 
                    defaultValue = {this.state.value}
                    step="1"
                />
                <label className="label-delay">  500ms</label>
                <Help helpText="Move the slider to the right to get slower animations. " />
            </div>
        );


    }
}

export default SpeedSlider;
