import React from 'react';
import Box from './Box';

class Grid extends React.Component {
    constructor(props) {
        super(props);
        var rows = this.initBoxRows();
        this.state = {boxRows:rows, mouseDownLocation:null, mouseUpLocation:null};
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
    onMouseDown = (rowCol) => {
        this.setState({mouseDownLocation : rowCol});
    }

    paintGreenOrBlue = (start, end) => {
        // find the lower of the two in rows, then find the higher of the two in rows and start iterating from lower to higher
        console.log("mouse clicked down on", start);
        console.log("mouse clicked down up", end);
        var rows = this.state.boxRows

        var i = start.row
        
        while(true) {
            var j = start.col;
            while(true) {
                rows[i][j].backgroundColor = 'green';
                this.setState({boxRows: rows})
                if (j === end.col) 
                    break
                else if(j < end.col)
                    j ++
                else 
                    j --;
            }
            if (i == end.row)
                break
            if (i < end.row)
                i++;
            else 
                i--;
        }
        // console.log("state clicked down", this.state.mouseDownLocation);
        // console.log("state clicked up", this.state.mouseUpLocation);
    }

    onMouseUp = (rowCol) => {
        this.setState({mouseUpLocation:rowCol});
        // set state is async so we are also passing the data coming into this function onto painGreenOrBlue
        this.paintGreenOrBlue(this.state.mouseDownLocation, rowCol);
    }
    renderRows = () => {
        var rows = this.state.boxRows.map((row, rowInd) => {
            var curRow = row.map((col, colInd) =>{
                return (
                    <td key={col.theKey}>
                      <Box 
                        backgroundColor={col.backgroundColor}
                        rowNumber={col.rowNumber}
                        colNumber={col.colNumber}
                        mouseDown={this.onMouseDown}
                        onMouseUp={this.onMouseUp}
                        />
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
    // onClick = () => {
    //     console.log("mouse clicked down on", this.state.onMouseDown);
    //     console.log("mouse clicked down up", this.state.onMouseUp);
    // }

    render () {
        return (
            <div key='grid'
                // onClick={this.onClick}
                > 
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
