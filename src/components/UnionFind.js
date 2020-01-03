
class UnionFind {
    constructor(grid) {
        this.nc = grid[0].length;
        this.nr = grid.length;

        this.numComp = 0;
        // there can be at most this.nr * this.nc number of 1s 
        // aka parent - the size of this array should be nr * nc 
        this.id = Array.from(Array(this.nr * this.nc).keys())
        // aka rank
        this.sz = Array.from(Array(this.nr * this.nc).keys())
        
        // this is the set up constructor position
        for(var i = 0; i < this.nr; i++) {
            for(var j = 0; j < this.nc; j++) {
                if (grid[i][j] === "1") {
                    var boxNumber = (i * this.nc) + j;
                    this.id[boxNumber] = boxNumber;
                    this.numComp ++;
                }
                this.sz[boxNumber] = 0;
            }
        }    
    }
    
    find(row, col) {
        
        var root = row * this.nc + col;
        var p = root;
        while(this.id[root] !== root) {
            root = this.id[root]
        }
        
        // reiterate the path and shorten paths and make the root the parent without hops
        while (p != root) {
          var next = this.id[p];
          this.id[p] = root;
          p = next;
        }
        return root;
    }
    
    unify(row1, col1, row2, col2) {
        
        var root = this.find(row1, col1);
        var root2 = this.find(row2, col2);
        if (root == root2) {
            return; // already unified
        }
        
        this.numComp = this.numComp - 1;
        if (this.sz[root] < this.sz[root2]) {
            this.id[root] = root2;
            this.sz[root2] += this.sz[root];
        }
        else {
            this.id[root2] = root;
            this.sz[root] += this.sz[root2];
        }
    }
    
    count() {
        return this.numComp;
    }
    
}
