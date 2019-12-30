import React from 'react';
import Box from './Box';

class Grid extends React.Component {
    constructor(props) {
        super(props);
        var rows = this.initBoxRows();
        this.state = {boxRows:rows};   
    }
    componentDidMount() {
        this.initBoxRows();
    }
    initBoxRows() {
        var rows = []
        for (var j = 0; j < 10; j++) { 
            var cols = []
            for(var i = 0; i < 10; i++) {
                cols.push({
                    backgroundColor: 'blue',
                    rowNumber: j,
                    colNumber: i,
                    theKey : "box-row-" + j + "-col-" + i
                });
            }
            rows.push(cols);
        }
        return rows;
    }
    renderRows = () => {
        var rows = this.state.boxRows.map((row, rowInd) => {
            var curRow = row.map((col, colInd) =>{
                return (
                    <td key={col.theKey}>
                      <Box 
                        backgroundColor={col.backgroundColor}
                        rowNumber={col.rowNumber}
                        colNumber={col.colNumber} />
                    </td>
                );
            });
            var rowKey = 'row-' + rowInd;
            return (
                <tr key={rowKey}>
                  {curRow}
                </tr>            
            )
        });
        return rows;
    }
    onClick() {
        console.log("clicked grid");
    }

    render () {
        return (
            <div key='grid'
                onClick={this.onClick}> 
            <table key='table'>
            <tbody key='tbody'>
                {this.renderRows()}
            </tbody>
            </table>
            </div>
        );

    }
}

export default Grid;
