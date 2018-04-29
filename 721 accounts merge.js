/*
  721 accounts merge
*/

var accountsMerge = function (accounts) {
  var hash = {}, merge = [], i, j, merge = new Array(accounts.length);

  for ( i = 0; i < accounts.length; i++) {
    for ( j = 1; j < accounts[i].length; j++) {
      let email = accounts[i][j],
      parent = hash[email];
      if (parent === undefined) {
        hash[email] = i;
      } else if (parent !== i){
        let parent = hash[email];
        mergeAccounts(accounts, parent, i, merge, hash);

        for (let k = 1; k < accounts[i].length; k++) {
          let dupeEmail = accounts[i][k];
          if (hash[dupeEmail] !== undefined && hash[dupeEmail] !== parent && hash[dupeEmail] !== i) {
            // all emails with value hash[email] in the hash should be merged with parent
            mergeAccounts(accounts, parent, hash[email], merge, hash);
          } else {
              hash[dupeEmail] = parent;
          }
        }

        break;
      }
    }

    // no existing email found in account i yet
    if (j === accounts[i].length) {
      merge[i] = accounts[i];
    }
  }

  //merge = buildMergedAccounts(accounts, hash);
  merge.forEach(account => {
    let name = account.shift();
    account.sort();
    account.unshift(name);
  });

  return merge;
}

function mergeAccounts(accounts, parent, cur, merge, hash) {
  // accounts[parents] must have existed in merge
  let dupe = accounts[cur];
  if (merge[cur]) {
    dupe = merge[cur];
  }

  for (let i = 1; i < dupe.length; i++) {
    let email = dupe[i];
    if (hash[email] === undefined || hash[email] === cur) {
      merge[parent].push(email);
    }
  }
}

/*
  use a reversed tree to track which sets should be merged
*/
var accountsMerge = function(accounts) {
  // build an hash table from the accounts, for each account, create a tree node, go through each accounts (merged) in the hash table to see if it should be merged
  var hash = {}, queue = [];
  for (let i = 0; i < accounts.length; i++) {
    if (hash[i] === undefined) {
      hash[i] = {};
    }

    hash[i] = {
      name: accounts[i][0],
      emails: accounts[i][1],
      node: {
        index: i,
        parent: i
      }
    }

    /*find overlapping sets*/
    let preAccounts = Object.values(hash);
    for (let index = 0; index < preAccounts.length; index++) {
      let curAcctEmails = hash[i].emails;

      for (let j = 0; j < curAcctEmails.length; j++) {
        if (preAccounts[index].emails.hasOwnProperty(curAcctEmails[j])) {
          /* accounts i should be merged with account index*/
          queue.push([hash[index].node.parent, hash[i].node.parent]);
        }
      }
    }
  }

  while (queue.length > 0) {
    let top = queue.shift();
    mergeSets(hash, top[0], top[1]);
  }

  return convertHashToArray(hash);

}

function mergeSets(hash, parent, child) {
  Object.keys(hash[child].emails).forEach(email => {
    if (!hash[parent].emails.hasOwnProperty(email)) {
      hash[parent].emails[email] = true;
    }
  });

  delete hash[child];
}

function convertHashToArray(hash) {
  var arr = [];
  let values = Object.values(hash);
  for (let i = 0; i < values.length; i++) {
    arr.push([values[i].name, ...Object.keys(values[i].emails)]);
  }

  return arr;
}

/*
function buildMergedAccounts(accounts, hash) {
  var accountHash = {};
  Object.keys(hash).forEach(email => {
    let index = hash[email];
    if (!accountHash.hasOwnProperty(index)) {
      accountHash[index] = [accounts[index][0]];
    }

    accountHash[index].push(email);
  });

   return Object.values(accountHash).slice(0);
}
*/


console.log(accountsMerge([
  ["David","David0@m.co","David1@m.co"],
  ["David","David3@m.co","David4@m.co"],
  ["David","David4@m.co","David5@m.co"],
  ["David","David2@m.co","David3@m.co"],
  ["David","David1@m.co","David2@m.co"]]
));
/*
console.log(accountsMerge([
  ["John", "johnsmith@mail.com", "john00@mail.com"],
  ["John", "johnnybravo@mail.com"],
  ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
  ["Mary", "mary@mail.com"]]
));

console.log(accountsMerge([
  ["David","David0@m.co","David4@m.co","David3@m.co"],
  ["David","David5@m.co","David5@m.co","David0@m.co"],
  ["David","David1@m.co","David4@m.co","David0@m.co"],
  ["David","David0@m.co","David1@m.co","David3@m.co"],
  ["David","David4@m.co","David1@m.co","David3@m.co"]]));
  */
