import React from 'react';
import './Help.css';
class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showTip: false }
  }

  showTip = ()  => {
    this.setState({
      showTip : true
    });
  }

  hideTip = () =>  {
    this.setState({
      showTip : false
    });
  }
  
  tooltopStyle = () => {
      var ret = 'hidden';
      if (this.state.showTip)
        ret = 'visible'
      return ret;
  }

  render() {
    return  (
      <div className="help" key="delay-help"
          onMouseOver={this.showTip} 
          onMouseOut={this.hideTip} >
        <i key = "question-mark"
          className="question circle icon" >
        </i>
        <div className="delay-help" 
          style={{visibility: this.tooltopStyle()}}
          >
          <p>
          Move the slider to the right to get slower animations. 
          </p>
        </div>
      </div>
    );
  }
}
export default Help;
