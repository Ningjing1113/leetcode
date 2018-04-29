/*
  764 largest plus sign
*/

var largestPlusSign = function(N, mines) {
  let grid = new Array(N);
  for (let i = 0; i < N; i++) {
    grid[i] = new Array(N);
    for (let j = 0; j < N; j++) {
        grid[i][j] = {val: 1, up: 0, right: 0, down: 0, left: 0};
    }
  }

  var hash = {};
  mines.forEach(mine => {
    let r = mine[0], c = mine[1];
    if (!hash.hasOwnProperty(r)) {
      hash[r] = {};
    }

    hash[r][c] = true;
  });

  function isZero(row, col) {
    return hash[row] && hash[row][col];
  }

  var max = 0, row, col;
  for (row = N - 1; row >=0; row--) {
    for (col = N - 1; col >=0; col--) {
        if (!isZero(row, col)) {
          let cur = grid[row][col];
          cur.right = 1 + (col + 1 < N && grid[row][col + 1].right) || 0;
          cur.down = 1 + (row + 1 < N && grid[row + 1][col].down) || 0;
        }
    }
  }

  for (row = 0; row < N; row++) {
    for (col = 0; col < N; col++) {
      if (!isZero(row, col)) {
        let cur = grid[row][col];
        cur.left = 1 + (col > 0 && grid[row][col - 1].left) || 0;
        cur.up = 1 + (row > 0 && grid[row - 1][col].up) || 0;

        let k = Math.min(cur.up, cur.right, cur.down, cur.left);
        max = Math.max(k, max);
      }
    }
  }

  return max;
}

console.log(largestPlusSign(5, [[4, 2]]));
