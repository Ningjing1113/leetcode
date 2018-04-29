/*
    accepted 138ms 100%
    663 equal tree partition
*/

/*
    pre-order traverse to find the sum, if it's an odd number, the tree can't be split. otherwise, do a post order traverse and sum the sub tree values along the way, when the sum tree sum is half of the entire tree's sum, cutting of the current sub tree from the original tree will be a split. since you only need to return boolean, you don't need to track the parent node while traversing. if it asks you to return the actuall edge, you can maintain the parent of the current node (not for all nodes, just the current). if you can't add parent link, after finding the sub tree, you can do another post order traverse to find this sub tree to obtain the split edge.
    
    this type of issue can be formed by post traversing the tree recursively with a model variable that tracks the status. normally some data field that does the calculation and a boolean that determine if the traverse can terminate earlier.
*/

var checkEqualTree = function(root) {
    if (!root || !root.left && !root.right) {
        return false;
    }
    
    var sum = 0, stack = [], cur;
    stack.push(root);
    while(stack.length > 0) {
        cur = stack.pop();
        sum += cur.val;
        if (cur.right) {
            stack.push(cur.right);
        }
        
        if (cur.left) {
            stack.push(cur.left);
        }
    }
    
    var model = {sum: 0, found: false, root: root};
    postOrderTraverse(root, model, sum);
    return model.found;
};

function postOrderTraverse(root, model, target) {
    if (!root) {
        return;
    }
    
    postOrderTraverse(root.left, model, target);
    if (!model.found) {
        var leftSum = model.sum;
        model.sum = 0;
        postOrderTraverse(root.right, model, target);
        if (!model.found) {
            var sum = leftSum + model.sum + root.val;
            if (sum * 2 === target && root !== model.root) {
                model.found = true;
            }
            
            model.sum = sum;
        } 
    }
    
    return;
}

/*
    code walk through
    1. check variable names (cur, left, right, root), empty tree, single node tree
    2. the tree node val doesn't have to be integer so you can't return tree if the sum of the entier tree is not an even number.
    3. define variable for clarity
    
    case walk throught
    1. tree that is a linked list (if applicable) and large tree (if applicable)
    
    bug:
    1. since you are using model as a shared data structure to track the traverse status, before traversing the right tree, you should clear the model.sum and save the left sum in a local variable. the only field that needs to be passed down is the boolean found.
    2. forget to update model.sum when neither left nor right tree is the split tree, thus sum up left right and current root and keep traversing.
    3. edge case when the sum is 0, in this case, the root will be thought as the sub tree based on your logic.
*/