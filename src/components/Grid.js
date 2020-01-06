import React from 'react';
import Box from './Box';
import PlayButton from './PlayButton';
import * as islands from './numIslandsComponent.js';
// import ResetButton from './ResetButton';
import './Grid.css';
import UnionFind from './UnionFind';

class Grid extends React.Component {

    constructor(props) {
        super(props);

        this.colorCodes = {
            'visited': 'red',
            'seen': 'white'
        }

        var rows = this.initBoxRows();
        this.state = {
            boxRows: rows,
            animating:false, 
            mouseDownLocation:null, 
            mouseUpLocation:null,
            resetOnRestart: false,
            componentCount: 0
        };
        

        this.resetState = this.copy(rows);
        this.transitionQueue = [];
        
    }

    componentDidMount() {
        // this.initBoxRows();
        this.startTransition();        
    }

    initBoxRows = () => {
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

    copy = (inp_array) => {
        var ret = []
        for (var i = 0; i < inp_array.length; i++)  {
            ret[i] = [];
            for (var j = 0; j < inp_array[i].length; j++) {
                var clonedObj = { ...inp_array[i][j]}
                ret[i].push(clonedObj);
            }
        }
        return ret;
    }
    
    startTransition = () => {
        clearInterval(this.transitionInterval);
        this.setState({animating: true});
        this.resetState = this.copy(this.state.boxRows);
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
            this.setState({animating: true});
            var rows = this.state.boxRows;
            var change = this.transitionQueue.shift();
            if ('count' in change) {
                this.setState({componentCount: this.state.componentCount + change.count});
            }
            else {
                // console.log(change);
                rows[change.row][change.col].backgroundColor =  change.backgroundColor;
                this.setState({boxRows: rows});
            }
            
        }
        else {
            this.setState({resetOnRestart : true});
            this.setState({animating: false});
            clearInterval(this.transitionInterval);
        }
    }

    revertSeenNodesToGreen(grid) {
        for(var i = 0; i < grid.length; i++) {
            for(var j = 0; j < grid[i].length; j++) { 
                if (grid[i][j].backgroundColor !== "blue") {
                    grid[i][j].backgroundColor = "green";
                }
            }
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

    dfsHelper(grid, neighbor) {
        if ( neighbor != null && grid[neighbor[0]][neighbor[1]].backgroundColor === "green") {
            // console.log(neighbor[0], neighbor[1]);
            grid[neighbor[0]][neighbor[1]].backgroundColor = this.colorCodes.seen;
            this.transitionQueue.push({
                row: neighbor[0],
                col: neighbor[1], 
                backgroundColor: this.colorCodes.seen
            })
            this.dfs(grid, neighbor[0], neighbor[1]);
        }
    }

    dfs(grid, startRow, startCol) {
        grid[startRow][startCol].backgroundColor = this.colorCodes.seen;
        this.transitionQueue.push({
            row: startRow,
            col: startCol, 
            backgroundColor: this.colorCodes.seen
        })

        var r = islands.right(grid, [startRow, startCol]);
        var l = islands.left(grid, [startRow, startCol])
        var u = islands.up(grid, [startRow, startCol]);
        var d = islands.down(grid, [startRow, startCol]); 
        this.dfsHelper(grid, r);
        this.dfsHelper(grid, l);
        this.dfsHelper(grid, u);
        this.dfsHelper(grid, d);
    }
    
    numIslandsBFS = () => {
        // var grid = Object.assign({}, this.state.boxRows); // copy of the object 
        this.setState({componentCount: 0});
        var grid = this.state.boxRows;
        for(var i = 0; i < grid.length; i++) {
            for(var j = 0; j < grid[i].length; j++) {
                if (grid[i][j].backgroundColor === "green") {
                    this.bfs(grid, i, j);
                    this.transitionQueue.push({count: 1});
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
        this.revertSeenNodesToGreen(grid);
        this.startTransition();
    }

    numIslandsDFS() {
        this.setState({componentCount: 0});
        var grid = this.state.boxRows;
        for(var i = 0; i < grid.length; i++) {
            for(var j = 0; j < grid[i].length; j++) {
                if (grid[i][j].backgroundColor === "green") {
                    this.dfs(grid, i, j);
                    this.transitionQueue.push({count: 1});
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
        this.revertSeenNodesToGreen(grid);
        this.startTransition();
    }

    numIslandsUnionFind() {
        this.setState({componentCount: 0});
        var grid = this.state.boxRows;
        var uf = new UnionFind(grid);
        for(var i = 0; i < grid.length; i++) {
            for(var j = 0; j < grid[i].length; j++) {
                if (grid[i][j].backgroundColor !== "blue") {
                    var l = islands.left(grid, [i, j]);
                    var r = islands.right(grid, [i, j]);
                    var u = islands.up(grid, [i, j]);
                    var d = islands.down(grid, [i, j]);
                    if (l && grid[l[0]][l[1]].backgroundColor !== "blue") {
                        uf.unify(i, j, l[0], l[1]);
                    }
                    if (r && grid[r[0]][r[1]].backgroundColor !== "blue") {
                        uf.unify(i, j, r[0], r[1]);
                    }
                    if (u && grid[u[0]][u[1]].backgroundColor !== "blue") {
                        uf.unify(i, j, u[0], u[1]);
                    }
                    if (d && grid[d[0]][d[1]].backgroundColor !== "blue") {
                        uf.unify(i, j, d[0], d[1]);
                    }
                }
                else {
                    uf.addToTransitionQueue(
                        {
                            row: i,
                            col: j, 
                            backgroundColor: this.colorCodes.visited
                        }
                    );
                }
            }
        }
        this.revertSeenNodesToGreen(grid);
        this.transitionQueue = [...uf.getTransitionQueue()];
        this.startTransition()
    }

    onPlayPause = () => {
        this.setState({
          animating: true,
          resetOnRestart: false
        })
        if (this.props.method === "DFS") {
            this.numIslandsDFS();
        }
        else if (this.props.method === "BFS") {
            this.numIslandsBFS();
        }
        else if (this.props.method === "Union Find") {
            this.numIslandsUnionFind();
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

    onReset = () => {
        this.transitionQueue = []
        // console.log(this.resetState);
        this.setState({animating: false});
        clearInterval(this.transitionInterval);
        this.setState({componentCount: 0});

        if (this.state.resetOnRestart === true) {
            // call the init method
            this.setState({boxRows: this.initBoxRows()});
        }
        else {
            // just reset to their input
            this.setState({boxRows:  this.resetState});
        }
        
    }

    getVisibilityResetButton() {
        var ret = !this.state.animating;
        if (this.state.resetOnRestart) {
            ret = !ret;
        }
        return ret;
    }

    render () {
        return (
        <div key='grid' > 
            <table key='table'>
            <tbody key='tbody'>
                {this.renderRows()}
            </tbody>
            </table>
            <PlayButton 
                onClick = {this.onPlayPause} 
                visible={this.getVisibilityResetButton} 
                icon="play" 
                labelText="Start"/>        
            <PlayButton 
                icon="undo alternate"
                labelText="Restart"
                onClick = {this.onReset}
                visible={this.getVisibilityResetButton}
            />
            <div className='component-count'>
                <h2>Island Count = {this.state.componentCount}</h2>
            </div>
        </div>
        );

    }
}

export default Grid;
