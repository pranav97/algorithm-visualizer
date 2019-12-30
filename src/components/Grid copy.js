





import React from 'react';
import Box from './Box';

class Grid extends React.Component {
    initBoxRows() {
        rows = []
        for (var j = 0; j < 10; j++) { 
            cols = []
            for(var i = 0; i < 10; i++) {
                cols.push({
                    backgroundColor: B
                })
            }
            
    }
    loadRows() {
        for (var j = 0; j < 10; j++) {
            var items = [] 
            for (var i = 0; i < 10; i ++) {
                var theKey = "box-row-" + j + "-col-" + i;
                items.push(
                    <td key={theKey}>
                        <Box></Box>
                    </td>
                );
            }
            var rowKey = 'row-' + j;
            rows.push(
                <tr key={rowKey}>
                    {items}
                </tr>
            );
    }
    constructor(props) {
        super(props);
        this.state = {boxRows:[]};
        initBoxRows();
    }
    onClick() {
        console.log("clicked grid");
    }

    render () {

        var rows = []

        }       
        return (
            <div key='grid'
                onClick={this.onClick}> 
            <table key='table'>
            <tbody key='tbody'>
                {rows}
            </tbody>
            </table>
            </div>
        );

    }
}

export default Grid;