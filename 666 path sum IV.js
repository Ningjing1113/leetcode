/*
    accepted 96ms 
    666 path sum IV
    
    
    the given data structure is an array of nodes in the order of a layer by layer traverse.
    
    in complete binary search tree, if a node the kth on its layer, its left child (should it exists) is the 2*Kth on the next layer, its right child (should it exists) is the 2*K + 1 th on the next layer. 
    
    the structure of path summary is 
    
        if (root.left) {
            sum += root.val + pathSum(root.left);
        }

        if (root.right) {
            sum += root.val + pathSum(root.right);
        }
    
*/
    /*
    how can you calculate the path sum of the whole tree using the above formula with the given data structure?
    you have the following challenges:
    1. you need to determine whether a given node has left child or right child or both.
    2. you need to access a given node's left child and right child.
    3. you need to access the node in a sequence that supports the formular. for example, from root, to root.left, root.left.left till you reach the leaf, and then you do the same recursion for root.right.
    
    the layer by layer traverse sequence would allow you to do it by using a queue. starting from the root node, take it out (shift) from the head of the array and push it into another array used as a queue. now the first two nodes in the original array will be your candidates of root.left and root.right. you can determine this using the 2*k formula. basically you look at the first two nodes of the origial array to see they are the children of the last node of your queue.
    you can maintain two pointer as well to track the current root and current children candidate without using an extra array. the base case of the recursion will by you have no children candidates.
    
    a follow up question would be can you solve this without using recursion but build the solution from ground up.
    
*/

/*
    Bug:
    1. the algorithm is wrong because by looking at two nodes after the current node, it only works for the first and second layer. however, it is correct that you need easy access to the left and right children of the current node. creating a hash table will give you this access. then you can solve the problem recursively just like you have the left and right pointer of the.
*/
var pathSum = function (nums) {
    if (!nums || nums.length === 0) {
        return 0;
    } 
    
    var hash = {}, sum = {val: 0}, pathSum = {val: 0}, i, layer, pos;
    
    /*
        create hash table to track which layer has which positions
        this hash table will give you quick access to a node's left and right children if they exist
        with this hash table, you can traverse the tree just like you have the left and right pointer
    */
    for (i = 0; i < nums.length; i++) {
        layer = _getLayer(nums[i]);
        pos = _getPosition(nums[i]);
        if (!hash.hasOwnProperty(layer)) {
            hash[layer] = {};
        }
        
        hash[layer][pos] = i;
    }
    
    sum.val += _getVal(nums[0]);
    _pathSumRecursive(nums, 0, sum, hash, pathSum);
    return pathSum.val;
}

function _pathSumRecursive(nums, index, sum, hash, pathSum) {
    var val, pos, layer, left, right, leftVal, rightVal;
    layer = _getLayer(nums[index]);
    pos = _getPosition(nums[index]);
    val = _getVal(nums[index]);  
    left = hash[layer + 1] && hash[layer + 1][2 * pos - 1];
    right = hash[layer + 1] && hash[layer + 1][2 * pos];
    if (!left && !right) {
        pathSum.val += sum.val;
        return;
    }
    
    if (left) {
        leftVal = _getVal(nums[left]);
        sum.val += leftVal;
        _pathSumRecursive(nums, left, sum, hash, pathSum);
        sum.val -= leftVal;
    }

    if (right) {
        rightVal = _getVal(nums[right]);
        sum.val += rightVal;
        _pathSumRecursive(nums, right, sum, hash, pathSum);
        sum.val -= rightVal;
    }
}

function _getPosition(num) {
    return Math.floor(num % 100 / 10);
}

function _getVal(num) {
    return Math.floor(num % 100 % 10);
}

function _getLayer(num) {
    return Math.floor(num / 100);
}











