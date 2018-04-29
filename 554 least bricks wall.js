/*
  554 brick wall
*/

var lestBricks = function(wall) {
  var hash = {};
  for (let i = 0; i < wall.length; i++) {
    let sum = 0;
    for (let j = 0; j < wall[i].length; j++) {
      sum += wall[i][j];
      if (!hash.hasOwnProperty(sum)) {
        hash[sum] = 0
      }

      hash[sum]++;
    }
  }

  let maxAlign = 0;
  for (let k = 1; k < sum; k++) {
    maxAlign = Math.max(maxAlign, hash[k]);
  }

  return wall.length - maxAlign;
}
