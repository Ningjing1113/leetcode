/*
    545 boundary of binary tree
    first try, works but memory exceeded
*/
var boundaryOfBinaryTree = function (root) {
    if (!root) {
        return [];
    }
    
    var cur, lb = [], rb = [], leaf = [];
    
    /* find the left boudary */
    if (root.left) {
        cur = root;
        while(cur) {
            lb.push(cur.val);
            if (cur.left) {
                cur = cur.left;
            } else if (cur.right) {
                cur = cur.right;
            } else {
                cur = null;
            } 
        }
    } else {
        lb.push(root);
    }
    
    /* find the right boundary */
    if (root.right) {
        cur = root.right;
        while(cur) {
            rb.push(cur.val);
            if (cur.right) {
                cur = cur.right;
            } else if (cur.left){
                cur = cur.left;
            } else {
                cur = null;
            }
        }                                
    }
    
    /* find the leaves */
    leaf = dfs(root);
    while (leaf.length > 0) {
        lb.push(leaf.unshift().val);
    }
    
    while (rb.length > 0) {
        lb.push(rb.pop().val);
    }
    
    return lb;
};

/*
    the visited hash is not needed for tree because you will reach each node only once.
    while traversing a graph (directed or undirected), a visited and/or status(discovered, finished) hash will be helpful
*/
function dfs(root) {
    var stack = [], cur, leaf = [];
    stack.push(root);
    while(stack.length > 0) {
        cur = stack.pop();
        /*
        if (!visited.hasOwnProperty(cur)) {
            visited[cur] = true;
        }
        */
        
        if (!cur.left && !cur.right) {
            leaf.push(cur.val);   
        } else {
            if (cur.right) {
                stack.push(cur.right);
            }
            
            if (cur.left) {
                stack.push(cur.left);
            }
        }
    }
    
    return leaf;
}

/*
    recursive pre-order traverse 
*/
function preOrder(root, leaf) {
    if (!root) {
        return;
    }
    
    var cur = s.pop();
    
    // process the current node
    if (!cur.left && !cur.right) {
        leaf.push(cur);
    }
    
    preOrder(cur.left);
    preOrder(cur.right);
}

/*
    Bugs:
    1. the left most and right most nodes should be removed from left boundary and right boudnary array because the leaf array also has these two nodes
    2. nodes in right boundary array should be poped and attached to the final boundary array after left boundary and leaf nodes
    3. replace for loop with while loop when traversing leaf nodes array and right boundary array
    4. memory limit exceeded
    
*/

/*
    accepted: 120ms
    second try. in order traverse once. go to left tree first to get the left boundary and leaf nodes, then go to right tree first once to get the right boundary. to collect the right boundary, you don't need to traverse the whole tree, just as long as you reach the right most node.
*/
var boundaryOfBinaryTree = function(root) {
    if (!root) {
        return [];
    } else if (!root.left && !root.right) {
        return [root.val];
    }
    
    var stack=[], cur, lb = [], rb = [], foundLeftMost = false, foundRightMost = false;
    if (root.left) {
        stack.push(root);
        while (stack.length > 0) {
            cur = stack.pop();
            if (cur.right) {
                stack.push(cur.right);
            }
            
            if (cur.left) {
                stack.push(cur.left);
            }
            
            /*
                by traversing root, then left, then right, a left boundary node is found until you reach the left most node
            */
            if (!foundLeftMost) {
                lb.push(cur.val);
            }
            
            /*
                first time a leaf node is found, it's the left most node
                notice when you mark left most node is found, you've already added the node in lb, so you need to change the boolean only
                after the left most node is found, only track leaf nodes
            */
            if (!cur.left && !cur.right) {
                if (!foundLeftMost) {
                    foundLeftMost = true;
                } else {
                    lb.push(cur.val);
                }
            }
        }
    } else {
        /* collect the leaf node only */
        lb.push(root.val);
        stack.push(root);
        while (stack.length > 0) {
            cur = stack.pop();
            if (cur.right) {
                stack.push(cur.right);
            }
            
            if (cur.left) {
                stack.push(cur.left);
            }
            
            if (!cur.left && !cur.right) {
                lb.push(cur.val)
            } 
        }
    }
    
    /*traverse the tree one more time to find the right boundary*/
    if (root.right) {
        stack.push(root.right);
        while (stack.length > 0) {
            cur = stack.pop();
            if (cur.left) {
                stack.push(cur.left);
            }
            
            if (cur.right) {
                stack.push(cur.right);
            }
            
            /*only look for the right boundary*/
            if (!foundRightMost) {
                rb.push(cur.val);
            }
            
            /*we can empty the stack and stop the traverse when the right most node is found*/
            if (!cur.left && !cur.right && !foundRightMost) {
                 stack = [];
            }
        }
    }
    
    /*the right most node is already counted as a leaf node in lb*/
    rb.pop();
    
    /*append right boundary after the left boundary and leaf nodes*/
    while (rb.length > 0) {
        lb.push(rb.pop());
    }
    
    return lb;
}

/*
    Bug:
    1. when left tree doesn't exist. the traverse should still happen so you get to collect the leaf nodes
    2. should handel edge case when root is null or undefined
    3. should handel edge case when root is the only node. In this case, lb will collect the leaf nodes, the root is counted twice
*/


/*
    third try.
    accepted: 202ms
    refactored to make the code more concise, however the performance is lower because of checking if conditions
*/
var boundaryOfBinaryTree = function(root) {
    if (!root) {
        return [];
    } else if (!root.left && !root.right) {
        return [root.val];
    }
    
    var stack=[], lb = [], rb = [], foundLeftMost = false, foundRightMost = false;
    stack.push(root);
    if (!root.left) {
        foundLeftMost = true;
        lb.push(root.val);
    }

    while (stack.length > 0) {
        cur = stack.pop();
        if (cur.right) {
            stack.push(cur.right);
        }

        if (cur.left) {
            stack.push(cur.left);
        }

        if (!foundLeftMost) {
            lb.push(cur.val);
        }

        if (!cur.left && !cur.right) {
            if (!foundLeftMost) {
                foundLeftMost = true;
            } else {
                lb.push(cur.val);
            }
        }
    }
    
        if (root.right) {
        stack.push(root.right);
        while (stack.length > 0) {
            cur = stack.pop();
            if (cur.left) {
                stack.push(cur.left);
            }
            
            if (cur.right) {
                stack.push(cur.right);
            }
            
            if (!foundRightMost) {
                rb.push(cur.val);
            }
             
            if (!cur.left && !cur.right && !foundRightMost) {
                 stack = [];
            }
        }
    }
    
    rb.pop();
    while (rb.length > 0) {
        lb.push(rb.pop());
    }
    
    return lb;
}


































































