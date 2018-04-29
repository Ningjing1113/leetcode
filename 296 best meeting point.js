/*
    296 best meeting point
*/
/*
  start from each cell whose value is 1, run a BFS searching for cell whose value is 0. for each 0 cell, track the distance from this cell to the current 1 cell. It's possible that you will reach to the same 0 cell from the same 1 cell more than once, update the distance to keep track on the minimla one.

  If you have k cells whose values are 1, by the end of the traversal and BFS, each 0 cell should have k distance, the 0 cell whose sum of all k distance values is the meeting point.

  This algorithm is similar to dijkstra in that you start from each point (whose value is 1) and branch out as wide as possible while keep track on the minimal distance to each accessible point. the difference is your focus is actually single point shortest distance while dijkstra will find all pairs shortest distance. This single point shortest distance algorithm runs k times (k being the number of cells whose values are 1), then you sum up all these k values for each cell whose value is 0 to find which cell has the shortest sum to all cells whose values are 1.

  one coding detail is to track those distance values for each 0 cell, you need to use a different data structure. so the first time you came to a 0 cell, if its type is a number, you need to convert it into the new data structure that you need. Notice that this mutate the original grid, if this is not allowed, you need to allocate extra grid for tracking.

  The new data structure for 0 cells need to track the distance to each 1 cell, if you give each 1 cell a index number starting from 0, then your new data structure can look like this:
  {
    val: 0,
    distance: [...]
  }

  notice that some 0 cells are not accessible from all 1 cells, in this case. if the length of the distance array is smaller than the number of 1's you've traversed, you need to push in 0 for the previous unaccessible 1 cells.

  the code strature will look liek:
  for () {
    for () {
      if () {
        bfs(...)
      }
    }
  }

  for () {
    for () {
      if () {
        min = Math.min(...)
      }
    }
  }

  function bfs() {
    queue
    while (queue.length > 0) {
      init cell if it's the fist time visit
      update distance if it's NOT the first time visit
    }
  }
*/

var minTotalDistance = function(grid) {
  let maxRow = grid.length, maxCol = grid[0] && grid[0].length || 0;
  grid.maxRow = maxRow;
  gir.maxCol = maxCol;

  let counter = {val: 0};
  for (let row = 0; row < grid.maxRow; row++) {
    for (let col = 0;  col < grid.maxCol; col++) {
      if (grid[row][col] === 1) {
        counter.val++;
        BFS(grid, row, col, counter);
      }
    }
  }

  let min = Infinity;
  for (let row = 0; row < grid.maxRow; row++) {
    for (let col = 0;  col < grid.maxCol; col++) {
      if (grid[row][col].val === 0) {
        min = Math.min(min, grid[row][col].sum);
      }
    }
  }
  
  return min;
}

function BFS(grid, row, col, counter) {
  let queue = [];
  queue.push({row: row, col: col, steps: 0});
  while (queue.length > 0) {
    let cur = queue.shift(),
    up = cur.row - 1 && grid[cur.row - 1][cur.col],
    right = cur.col + 1 < grid.maxCol && grid[cur.row][cur.col + 1],
    down = cur.row + 1 < grid.maxRow && grid[cur.row + 1][cur.col],
    left = cur.col - 1 && grid[cur.row][cur.col - 1];

    processCell(up, cur.row - 1, cur.col);
    processCell(right, cur.row, cur.col + 1);
    processCell(down, cur.row + 1, cur.col);
    processCell(left, cur.row, cur.col - 1)
  }
}

function processCell(up, row, col) {
  if (up === undefined) {
    return;
  }

  if (up === 0) {
    up = {
      val: 0,
      distanceQueue: [],
      sum: 0
    }

    /*
      there are counter - 1 1 cells that are not accessible from this 0 cell. fill in 0 for these these 1 cells
    */
    for (let i = 1; i < counter.val) {
      cur.distanceQueue.push(0);
    }

    // distance to the current 1 cell
    distance.push(cur.steps + 1);
    queue.push(up);
    grid[row][col] = up;
  } else if (up.val === 0) {
    /*
      you've visted this cell before
    */
    while(let i = 1; i < counter.val - up.distance.length; i++) {
      up.distance.push(0);
    }

    /*
      if this is the first time you visit this cell from the current 1 cell, the preMinDistance will be Infinity since the counter.val - 1 value will be undefined
    */
    let preMinDistance = up.distance[counter.val - 1];
    if (!preMinDistance || preMinDistance > cur.steps + 1) {
        up.distance[counter.val - 1] = cur.steps + 1;
        queue.push(up);
  }
}
