/*
  670 maximum swap
*/

var maximumSwap = function(num) {
  let str = [].map.call(num.toString(), s => {return s}), i = 0, j = 0;
  while (j < str.length - 1 && str[j] > str[j + 1]) {
    j++;
  }

  i = j;
  let max = j;
  while (j < str.length) {
    max = str[j] >= str[max] ? j : max;
    j++;
  }

  if (max === str.length) {
    return num;
  }

  swap(str, i, max);
  return convertStrToNum(str);
}

function swap(str, i, j) {
  let temp = str[i];
  str[i] = str[j];
  str[j] = temp;
}

function convertStrToNum(str) {
  let len = str.length - 1, num = 0;
  for (let i = 0; i < str.length; i++) {
    num += Math.pow(10, len) * parseInt(str[i]);
    len--;
  }

  return num;
}

console.log(maximumSwap(98368));
console.log(maximumSwap(2736));
console.log(maximumSwap(9972));
console.log(maximumSwap(1234));
console.log(maximumSwap(4321));
console.log(maximumSwap(1993));
