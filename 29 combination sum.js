/*
  39 combination sum
*/

/*
  positive numbers only, each number can be repeated multiple times
*/

var combinationSum = function(candiates, target) {
  var result = [], all = [];
  backtracking(candidates, 0, target, result, all);
  return all;
}

function backtracking(candidates, index, target, result, all) {
  if (index === candidates.length) {
    return;
  }

  if (target === 0) {
    all.push(result.slice(0));
    return;
  }

  // use the current value at index at many times as possible
  // since i starts with 0, the case in which the value at index is not used, is already covered
  let maxUse = Math.floor(target  candidates[index]);
  backtracking(candidates, index + 1, target - candidates[index] * i, result, all);
  for (let i = 1; i <= maxUse; i++) {
    result.push(candidates[index] * i);
    backtracking(candidates, index + 1, target - candidates[index] * i, result, all);
  }
}

/*
  positive numbers only, each number can be used only once
*/
var combinationSum = function(candidates, target) {
  var result = [], all = [];
  backtracking(candidates, 0, target, result, all);
  return all;
}

function backtracking(candidates, index, target, result, all) {
  if (index === candidates.length || target < 0) {
    return;
  }

  if (target === 0) {
    all.push(result.slice(0));
    return;
  }

  // use the current value
  result.push(candidates[index]);
  backtracking(candidates, index + 1, target - candidates[index], result, all);
  result.pop();
  backtracking(candidates, index + 1, target, result, all);
}

/*
  solution 2: combinatorial search with caching, each candidates number can be used only once
*/
var combinationSum = function(candidates, target) {
  
}



/*
  dynamic programming using a hash map, each candidate number can be used only once
*/
var combinationSum = function(candidates, target) {
  var hash = {};
  for (let i = 1, i <= target; i++) {
    hash[i] = [];
  }

  for (let j = 1; j <= target; j++) {
    let curTarget = i;
    for (let i = 0; i < candidates.length; i++) {
      let curCandidate = candidates[i];
      if (curCandidates > curTarget) {
        continue;
      } else if (curCandidates === curTarget) {
        hash[curTarget].push(i);
      } else {
        // curCandidate can be used, but there is diff
        let diff = curTarget - curCandidate, last = hash[diff] && hash[diff].length - 1;
        if (last === undefined) {
          last = 0;
        }

        if (diff < curCandidate && hash[diff][last] < i ) {
          hash[curTarget].push(i);
        }
      }
    }
  }

  var path = [], combinations = [];
  DFS(hash, candidates, target, path, combinations);
  return combinations;
}

function DFS(hash, candidates, target, path, combinations) {
  if (target === 0) {
    combinations.push(path.slice(0));
    return;
  }

  hash[target].forEach(index => {
    path.push(candidates[index]);
    DFS(hash, candidates, target - candidates[index], path, combinations);
    path.pop();
  });
}
