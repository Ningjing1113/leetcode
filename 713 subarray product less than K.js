/*
  713 subarray product less than K
*/
var numSubarrayProductLessThanK = function(nums, K) {
  /* create an grid to cache the results */
  let maxLength = nums.length, grid = new Array(maxLength), counter = 0;
  for (let i = 0; i < maxLength; i++) {
    grid[i] = new Array(maxLength);
    for (let j = 0; j < maxLength; j++) {
      if (i === j) {
        grid[i][j] = nums[i];
        if (grid[i][j] < K) {
          counter++;
        }
      } else {
        grid[i][j] = K;
      }
    }
  }

  let i, j, length;
  for (length = 2; length <= nums.length; length++) {
    for (i = 0; i + length - 1 < nums.length; i++) {
      j = i + length - 1;
      if (grid[i][j - 1] < K) {
        grid[i][j] = grid[i][j - 1] * nums[j];
        if (grid[i][j] < K) {
          counter++;
        }
      }
    }
  }

  return counter;
}
