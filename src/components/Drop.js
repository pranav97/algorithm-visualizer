import React from 'react';
import './Drop.css';
class Drop extends React.Component {
    render() {
        return (
            <div className="drop-container">
                <select className="ui dropdown dropdown-button">
                    <option value="0">DFS</option>
                    <option value="1">BFS</option>
                    <option value="2">Union Find</option>
                </select>
            </div>
        )
    }
}

export default Drop;