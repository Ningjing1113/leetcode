/*
  222 maximum square
*/
/*
    you want to look at right and down
    the distance you can traval to the right is Math.min(matrix[row][col + 1].right + 1, maxtrix[row+1][col].right)
    the distance you can travel to down is Math.min(matrix[row][col+1].down, matrix[row+1][col].down + 1)
    if these two distance are the same, there is a square at the current position (the current position is the upper left cornor of the square)
    you need another variable max to track the maximum matrix you can have
*/
var maximalSquare = function(matrix) {
  var max = 0, row, col, maxRow = matrix.length, maxCol = matrix[0] && matrix[0].length || 0;
  for (row = maxRow - 1; row >= 0; row--) {
    for (col = maxCol - 1; col >= 0; col--) {
      matrix[row][col] = {
        val: matrix[row][col],----
        right: 0,
        down: 0
      };

      if (matrix[row][col].val === '1') {
        let rightCell = col + 1 < maxCol && matrix[row][col + 1],
        downCell = row + 1 < maxRow && matrix[row+1][col],
        farRight = Math.min(rightCell && rightCell.right || 0 + 1, downCell && downCell.right),
        farDown = Math.min(rightCell && rightCell.down || 0, downCell && downCell.down || 0 + 1);
        if (farRight === farDown) {
          max = Math.max(farRight*farDown, max);
        }
      }
    }
  }

  return max;
};

console.log(maximalSquare([
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]]));
  
