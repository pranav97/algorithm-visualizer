import React from 'react';
import Grid from './components/Grid';
import SpeedSlider from './components/SpeedSlider';
import './App.css';
import Drop from './components/Drop';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 1,
      sidebarOpen: false,
      height: window.innerHeight, 
      width: window.innerWidth,
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    console.log(this.state.height);
    // Additionally I could have just used an arrow function for the binding `this` to the component...
    window.addEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      height: window.innerHeight, 
      width: window.innerWidth
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateSpeed = (val) => {
    this.setState({
      speed: val
    });
  }

  getSidebarIconVisibility(){
    var ret = "visible";
    if (this.state.width > 700 ) {
      ret = "hidden";
    }
    return ret;
  }

  getSidebarClass() {
    var ret = "ui right wide sidebar overlay";
    if (this.state.width > 700 ) {
      ret += " visible";
    }
    else {
      if (this.state.sidebarOpen) {
        ret += " visible";
      }
    }
    return ret;
  }

  onClick = () => {
    console.log("clicked");
    if (this.state.sidebarOpen === true) {
      this.setState({sidebarOpen: false});
    }
    else {
      this.setState({sidebarOpen: true});
    }
  }

  hideSidebar = () => {
    this.setState({sidebarOpen: false});
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <div 
            key="sidebar"
            className="ui top attached demo menu">
            <h3 className="item"> Algorithm Visualizer</h3>
            <div 
              className="item" 
              style={{visibility: this.getSidebarIconVisibility()}}
              onClick={this.onClick}
              >
              <i 
                className="sidebar icon" 
                style={{visibility: this.getSidebarIconVisibility()}}
              ></i>
            </div>
          </div>
        </div>
        <div className={this.getSidebarClass()}>
          <div
            className="item chevron"
            onClick={this.hideSidebar}
            // style={{marginTop: '30px'}}
          >
            <i className="chevron right icon"></i>
          </div>
          <SpeedSlider
            defaultValue={this.state.speed} 
            updateSpeed={this.updateSpeed} />
          <Drop 
          />
        </div>
        <div className="dimmed pusher">
          <div className="viz">
          <Grid 
              maxRow="30" 
              maxCol="20" 
              speed={this.state.speed}/>
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;

