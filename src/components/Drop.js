import React from 'react';
import './Drop.css';
import Help from './Help';
class Drop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            method: "DFS" 
        };
    }

    onChange = (e) => {
        this.setState({ method: e.target.value });
        this.props.methodChanged(e.target.value);
    }
    
    render() {
        return (
            <div className="drop-container">
                <select 
                    className="ui dropdown dropdown-button"
                    onChange={this.onChange}
                >
                    <option value="DFS">DFS</option>
                    <option value="BFS">BFS</option>
                    <option value="Union Find">Union Find</option>
                </select>
                <Help helpText="Select one of the methods to see animations for how that algorithm works. "/>
            </div>
        )
    }
}

export default Drop;