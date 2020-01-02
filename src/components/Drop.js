import React from 'react';
import './Drop.css';
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
            </div>
        )
    }
}

export default Drop;