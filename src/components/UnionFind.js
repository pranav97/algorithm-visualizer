
class UnionFind {
    
    constructor(grid) {
        this.usedColors = [];
        this.nc = grid[0].length;
        this.nr = grid.length;

        this.numComp = 0;
        // there can be at most this.nr * this.nc number of 1s 
        // aka parent - the size of this array should be nr * nc 
        this.id = Array.from(Array(this.nr * this.nc).keys())
        // aka rank
        this.sz = Array.from(Array(this.nr * this.nc).keys())
        this.transitionQueue = [] 
        this.grid = grid;
        // this is the set up constructor position
        for(var i = 0; i < this.nr; i++) {
            for(var j = 0; j < this.nc; j++) {
                if (this.grid[i][j].backgroundColor === "green") {
                    this.grid[i][j].backgroundColor = this.getRandomColor();
                    this.transitionQueue.push(
                        {
                            row: i,
                            col: j, 
                            backgroundColor: this.grid[i][j].backgroundColor
                        }
                    );
                    // console.log(this.transitionQueue)
                    var boxNumber = (i * this.nc) + j;
                    this.id[boxNumber] = boxNumber;
                    this.numComp ++;
                    this.transitionQueue.push({count: 1});
                }
                this.sz[boxNumber] = 0;
            }
        }    
        // console.log(this.transitionQueue);
    }
    
    getTransitionQueue() {
        return this.transitionQueue;
    }
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        if (color in this.usedColors) { 
            return this.getRandomColor();
        }
        return color;
      }
      
    find(row, col) {
        
        var root = row * this.nc + col;
        var p = root;
        while(this.id[root] !== root) {
            root = this.id[root]
        }
        
        // reiterate the path and shorten paths and make the root the parent without hops
        while (p !== root) {
          var next = this.id[p];
          this.id[p] = root;
          p = next;
        }
        return root;
    }
    convertColors(row1, col1, row2, col2) {
        // console.log(row1, col1, " has been changed to ", row2, col2)
        var fromColor = this.grid[row1][col1].backgroundColor;
        var toColor = this.grid[row2][col2].backgroundColor;
        for(var i = 0; i < this.nr; i++) {
            for(var j = 0; j < this.nc; j++) {
                if (this.grid[i][j].backgroundColor === fromColor) {
                    this.grid[i][j].backgroundColor = toColor;
                    this.transitionQueue.push(
                        {
                            row: i,
                            col: j, 
                            backgroundColor: toColor
                        }
                    );
                }
            }
        }
    }
    
    unify(row1, col1, row2, col2) {
        
        var root = this.find(row1, col1);
        var root2 = this.find(row2, col2);
        if (root === root2) {
            return; // already unified
        }
        
        this.numComp = this.numComp - 1;
        this.transitionQueue.push({
            count: -1
        });
        if (this.sz[root] < this.sz[root2]) {
            this.convertColors(row1, col1, row2, col2)
            this.id[root] = root2;
            this.sz[root2] += this.sz[root];
        }
        else {
            this.convertColors(row2, col2, row1, col1)
            this.id[root2] = root;
            this.sz[root] += this.sz[root2];
        }
    }
    
    count() {
        return this.numComp;
    }
    addToTransitionQueue(obj) {
        this.transitionQueue.push(obj);
    }
    
}
export default UnionFind;