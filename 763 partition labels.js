/*
  accepted 64ms 98%
  763 partition labels
*/

/*
  you can go throught the array once from left to right and record first and last apprearance of teach letter, save the result in an array and map the letter to the array's index using a hash table

  the data structure used in the array could be
  {
    start: 0,
    end: 4
  }

  if the above object is the element at index 0 and the letter is "a", in the hash table, there is an entry
  {
    a: 0
  }

  then you can sort the array by the start index and then merge intervals. the interval starts with the first letter's start and end, then you either keep this range if the next range falls into this range; or extend the end of the range if the next range starts within this range but ends after this range; or start a new range if the next range starts after this range. whenever you start a new range, it counts for one partition, so you keep an array called partition and add the start point of this new range into your partition array.
*/

var partitionLabels = function(S) {
  let hash = {}, ranges = [];
  for (let i = 0; i < S.length; i++) {
    if (!hash.hasOwnProperty(S[i])) {
      hash[S[i]] = ranges.length;
      ranges.push({
        start: i,
        end: i
      });
    } else {
      ranges[hash[S[i]]].end = i;
    }
  }

    //console.log(ranges);
  ranges.sort((a, b) => {
    return a.start - b.start;
  });

    //console.log(ranges);

  let partition = [], start = ranges[0].start, end = ranges[0].end;

  for (let i = 1; i < ranges.length; i++) {
    let curStart = ranges[i].start, curEnd = ranges[i].end;
    if (curStart > end) {
        //console.log(`start: ${start} end: ${end}`);
      partition.push(end - start + 1);
      start = curStart;
      end = curEnd;
    } else if (curEnd > end) {
      end = curEnd;
    }
  }

  partition.push(end - start + 1);
  return partition;
}

/*

*/
