/*
  253 meeting room II
*/

var minMeetingRooms = function(intervals) {
  if (!intervals || intervals.length === 0) {
    return 0;
  }

  var range = [];
  intervals.forEach(interval => {
    let s = {val: interval[0], overlap: 1},
    e = {val: interval[1], overlap: -1};
    range.push(s);
    range.push(e);
  });

  range.sort((a, b) => {
    return a.val - b.val;
  });

  var max = 0, overlap = 0;
  range.forEach(range => {
    overlap += range.overlap;
    max = Math.max(overlap, max);
  });

  return max;
}

console.log(minMeetingRooms([[5,8],[6,8]]));
/*
console.log(minMeetingRooms([[0, 30],[5, 10],[15, 20]]));
console.log(minMeetingRooms([[0, 15]]));
*/
