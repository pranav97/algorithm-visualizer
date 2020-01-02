import React from 'react';
import Grid from './components/Grid';
import SpeedSlider from './components/SpeedSlider';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxRows: null,
      speed: 3
    }
  }
  updateSpeed = (val) => {
    this.setState({
      speed: val
    });
  }



  render() {
    return (
      <div className="App">
        <h1 className='header'>Algorithm Visualizer</h1>
        <div className="container">
          <div className="viz">
            <Grid maxRow="30" maxCol="20" speed={this.state.speed}/>
          </div>
          <nav className='controls'>
            <SpeedSlider defaultValue={this.state.speed} updateSpeed={this.updateSpeed}/>
          </nav>
          
        </div>
      </div>
    );
  }
  
}

export default App;

