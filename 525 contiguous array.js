/*
  525 contiguous array
*/

var findMaxLength = function(nums) {
  let hash = {}, zero = 0, one = 0, zeroarr = [], onearr = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      zero++;
    } else {
      one++;
    }

    zeroarr.push(zero);
    onearr.push(one);
    let diff = zero - one;
    if (!hash.hasOwnProperty(diff)) {
      hash[diff] = [];
    }

    hash[diff].push(i);
  }

  let max = 0;
  for (let j = nums.length - 1; j >= 0; j--) {
    if (zeroarr[j] === onearr[j]) {
      return 2 * zeroarr[j];
    }

    let diff = zeroarr[j] - onearr[j],
    index = hash[diff] && hash[diff][0];

    if (index !== undefined && index !== j) {
      max = Math.max(max, 2 * (zeroarr[j] - zeroarr[index]));
    }
  }

  return max;
}

console.log(findMaxLength([0, 1, 1, 0, 1, 1, 1, 0]));
//console.log(findMaxLength([0, 1, 0, 0, 0, 0, 1, 1]));
