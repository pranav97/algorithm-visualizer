/**
 * @param {character[][]} grid
 * @return {number}
 */

export function left(grid, loc) {
    if (loc[1] - 1 >= 0) {
      return [loc[0], loc[1] - 1];
    }
}

export function right(grid, loc) {
    if (loc[1] + 1 < grid[0].length) {
      return [loc[0], loc[1] + 1];
    }

}

export function up(grid, loc){
    if (loc[0] - 1 >= 0) {
        return [loc[0]-1, loc[1]];
    }
}

export function down(grid, loc) {
    if (loc[0] + 1 < grid.length) {
        return [loc[0]+1, loc[1]];
    }
}