import React from 'react';
import Box from './Box';

class Grid extends React.Component {
    constructor(props) {
        super(props);
        var rows = this.initBoxRows();
        this.state = {boxRows:rows, mouseDownLocation:null, mouseUpLocation:null};
        this.transitionQueue = []
    }
    componentDidMount() {
        this.initBoxRows();
        this.startTransition();        
    }
    initBoxRows() {
        var rows = []
        for (var j = 0; j < this.props.maxRow; j++) { 
            var cols = []
            for(var i = 0; i < this.props.maxCol; i++) {
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

    onMouseUp = (rowCol) => {
        this.setState({mouseUpLocation:rowCol});
        // set state is async so we are also passing the data coming into this 
        // function onto painGreenOrBlue
        this.paintGreenOrBlue(this.state.mouseDownLocation, rowCol);
    }

    paintGreenOrBlue = (start, end) => {
        console.log("mouse clicked down on", start);
        console.log("mouse clicked down up", end);
        var rows = this.state.boxRows;

        var i = start.row
        var changeTo = 'green';
        if (rows[start.row][start.col].backgroundColor === 'green') {
            changeTo = 'blue';
        }
        while(true) {
            var j = start.col;
            while(true) {
                this.transitionQueue.push(
                    {
                        row: i,
                        col: j, 
                        backgroundColor: changeTo
                    }
                );
                if (j === end.col) 
                    break
                else if(j < end.col)
                    j ++
                else 
                    j --;
            }
            if (i === end.row)
                break
            if (i < end.row)
                i++;
            else 
                i--;
        }
        this.startTransition();
    }

    startTransition = () => {
        clearInterval(this.transitionInterval);
        this.transitionInterval = setInterval(this.doChange, (this.props.speed * 100));
        this.setState({
            currentSpeed : this.props.speed
        })
    }
  
    doChange = () => {
        console.log(this.state.currentSpeed);
        if (this.props.speed !== this.state.currentSpeed) {
          this.startTransition();
          return;
        }
        if (this.transitionQueue.length !== 0){ 
            var rows = this.state.boxRows;
            var change = this.transitionQueue.shift();
            rows[change.row][change.col].backgroundColor =  change.backgroundColor;
            this.setState({boxRows: rows});
        }
        else {
            clearInterval(this.transitionInterval)
        }
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
    render () {
        return (
            <div key='grid'
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
