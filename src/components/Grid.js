import React from 'react';
import Box from './Box';
import PlayButton from './PlayButton';
import * as islands from './numIslandsComponent.js';

class Grid extends React.Component {
    constructor(props) {
        super(props);
        var rows = this.initBoxRows();
        this.state = {
            goTime:false, 
            boxRows:rows, mouseDownLocation:null, mouseUpLocation:null};
        this.transitionQueue = [];
        this.colorCodes = {
            'visited': 'red',
            'seen': 'white'
        }
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
        if (!this.state.mouseDownLocation) {
            return;
        }
        // set state is async so we are also passing the data coming into this 
        // function onto painGreenOrBlue
        this.paintGreenOrBlue(this.state.mouseDownLocation, rowCol);
    }

    paintGreenOrBlue = (start, end) => {
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
        // console.log(this.state.currentSpeed);
        if (this.props.speed !== this.state.currentSpeed) {
          this.startTransition();
          return;
        }
        if (this.transitionQueue.length !== 0){ 
            var rows = this.state.boxRows;
            var change = this.transitionQueue.shift();
            // console.log(change);
            rows[change.row][change.col].backgroundColor =  change.backgroundColor;
            this.setState({boxRows: rows});
        }
        else {
            clearInterval(this.transitionInterval)
        }
    }

    // these functions are going to actually solve the problem

    checkLand(grid, neighbor, bfs_queue) {
        if ( neighbor != null && grid[neighbor[0]][neighbor[1]].backgroundColor === "green") {
            grid[neighbor[0]][neighbor[1]].backgroundColor = this.colorCodes.seen;
            bfs_queue.push(neighbor);            
        }
        return bfs_queue;
    }

    bfs(grid, startRow, startCol){
        // bfs = (grid, startRow, startCol) => {
        var queue = [[startRow,startCol]]
        
        while (queue.length > 0) {

            // console.log("queue", queue);
            var cur = queue.shift();

            this.transitionQueue.push(
                {
                    row: cur[0],
                    col: cur[1], 
                    backgroundColor: this.colorCodes.seen
                }
            );
            var r = islands.right(grid, cur);
            var l = islands.left(grid, cur)
            var u = islands.up(grid, cur);
            var d = islands.down(grid, cur);
            
            queue = this.checkLand(grid, r, queue);
            queue = this.checkLand(grid, l, queue);
            queue = this.checkLand(grid, u, queue);
            queue = this.checkLand(grid, d, queue);
        }
    }

    numIslands = () => {
        // var grid = Object.assign({}, this.state.boxRows); // copy of the object 
        var countNumIslands = 0;
        var grid = this.state.boxRows;
        for(var i = 0; i < grid.length; i++) {
            for(var j = 0; j < grid[i].length; j++) {
                if (grid[i][j].backgroundColor === "green") {

                    this.bfs(grid, i, j);
                    countNumIslands++;
                }
                else {
                    this.transitionQueue.push(
                        {
                            row: i,
                            col: j, 
                            backgroundColor: this.colorCodes.visited
                        }
                    );
                }
            }
        }
        for(i = 0; i < grid.length; i++) {
            for(j = 0; j < grid[i].length; j++) { 
                if (grid[i][j].backgroundColor === this.colorCodes.seen) {
                    grid[i][j].backgroundColor = "green";
                }
            }
        }
        this.startTransition();
        return countNumIslands;
    }

    onPlayPause = () => {
        this.setState({
          goTime: true
        })
        this.numIslands();
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
        <div key='grid' > 
            <table key='table'>
            <tbody key='tbody'>
                {this.renderRows()}
            </tbody>
            </table>
            <PlayButton onPlayPause = {this.onPlayPause} visible={this.state.goTime} icon="play" labelText="Start"/>        
        </div>
        );

    }
}

export default Grid;
