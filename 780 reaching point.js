/*
  780 reaching point
*/
/*
  starting from sx sy, move to tx, ty. the rules are if you move to the right (assuming sx, xy is at 0, 0, and moving up and right means incresing the coordinates y and x), the steps you take must be the value of the x of your current position; if you move up, the steps you take must be the value of the y of your current position. this means you are leaping forward by taking each step further.

  runtime analysis. assuming if we just need in one direction till we reach (or miss) the target position.

  backtracking: at each position, we have two choices, moving ritht or moving up, until we reach the point or miss the point.

  pruning: it's possible that at one point, we exceed either the x or y of the target position, then there is no point of keep going. if at one point, we've reached the target point, then we can return true; if after trying all possible path we never reach the target point, return false.

  caching: the runtime will be exponential because the problem involes taking steps and at each step we have multiple choices. since it is possible that we will reach the same middle point by taking different path, if we already know from this middle point, we are not able to reach the target point and cache this result, then we can bail out and try the next possible path. since we only care about whether or not we can reach the target from a certain point, a hash set will be enough. the key can be x-y as a string, and value is false. digging deeping on the cache's data structure, since we've have return true the first time we reached the target position, the hash set can only cache the point that are beyond the coordinates of the target value, so if we can the hash beyondPoints, the value can be true, meaning if this point exist, it won't lead us to the target point.

  if from one point, taking one path doesn't lead us to the target point, does that mean this point will not lead us to the point at all? answer is no because there might be other paths from this point that might lead us to the target point.
*/

var reachingPoint = function (sx, tx, sy, ty) {
  let start = {x: sx, y: sy}, target = {x: tx, y: ty}, cur = {x: sx, y: xy}, reachable = {val: false};
  backtracking(cur, target, reachable);
  return reachable.val;
}

function backtracking(cur, target){
  if (cur.x > target.x || cur.y > target.y) {
    return;
  } else if (cur.x === target.x && cur.y === target.y) {
    reachable.val = true;
    return;
  }

  // go right
  cur.y += cur.x;
  backtracking(cur, target, reachable);
  if (reachable.val) {
    return;
  }

  // up
  cur.y -= cur.x;
  cur.x += cur.y;
  backtracking(cur, target, reachable);
}

/*
  can you beat exponential
*/
