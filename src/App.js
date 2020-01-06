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
      method: "DFS"
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    // console.log(this.state.height);
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
    if (this.state.width > 750 ) {
      ret = "hidden";
    }
    return ret;
  }

  getSidebarClass() {
    var ret = "ui right wide sidebar overlay";
    if (this.state.width > 750 ) {
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

  methodChanged = (method) => {
    this.setState({
      method: method
    });
  }

  getChevronVisibility() {
    if (this.state.width > 750 ) {
      return "hidden";
    }
    return "visible";
  }

  // getInstructionsWidth() {
  //   if (this.state.width > 750 ) {
  //     console.log(parseInt(this.state.width) - 380 + 'px' );

  //     return parseInt(this.state.width) - 380 + 'px' ;
  //   }
  //   else {
  //     console.log(100 + "%");
  //     return 100 + "%";
  //   }

  // }
  render() {
    return (
      <div className="App">
        <div className="header">
          <div 
            key="sidebar"
            className="ui top attached demo menu">
            <h3 className="item">Algorithm Visualizer</h3>
            <div 
              className="item" 
                style={
                    {visibility: this.getSidebarIconVisibility()}
                }
              onClick={this.onClick}
              >
              <i 
                className="sidebar icon" 
              ></i>
            </div>
          </div>
        </div>
        <div className = "content">
          <div className={this.getSidebarClass()}>
            <div
              className="item chevron"
              onClick={this.hideSidebar}
              style={{ visibility: this.getChevronVisibility()}}
            >
              <i className="chevron right icon"></i>
            </div>
            <SpeedSlider
              defaultValue={this.state.speed} 
              updateSpeed={this.updateSpeed} />
            <Drop 
              methodChanged={this.methodChanged}
            />
          </div>
          <div className="dimmed pusher">
            <div>
              <h2>Problem: </h2>
              <p>Count the number of islands in the sea. Initially the entire grid consists only of water. Go ahead and add some land to watch the algorithm count the number of islands.  </p>
              <p>
                There  are 3 different methods that are showcased here, click here to read more about the methods. 
              </p>
            </div> <br/>
            <div className="instructions">
            <h2>Instructions on using simulation: </h2>
            <ol>
              <li>
                <p>Click and drag to create an island. </p>
              </li>
              <li>
                <p>In the dropdown for method in the navbar on the right hand side, choose the one you want to see. </p>
              </li>
              <li>
                <p>Click start</p>
              </li>
              <li>
                <p>Adjust delay to speed up as needed. </p>
              </li>
              <li>
                <p>Look out for output - Island Count below the grid. </p>
              </li>
            </ol>
            </div>
            <div className="viz">
            <Grid 
                method={this.state.method}
                maxRow="30" 
                maxCol="20" 
                speed={this.state.speed}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;

