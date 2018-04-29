function createTree(nums) {
          var queue = [], root, pre, cur, node;
          node = {
              val: nums.shift(),
              left: undefined,
              right: undefined,
          };
          
          root = node;
          pre = root;
          while (nums.length > 0) {
              cur = nums.shift();
              if (!cur) {
                  node = null;
              } else {
                  node = {
                      val: cur,
                      left: undefined,
                      right: undefined
                  };
              }
              
              if (node) {
                  queue.push(node);
              }
              
              if (pre.left === undefined) {
                  pre.left = node;
              } else if (pre.right === undefined) {
                  pre.right = node;
                  pre = queue.shift();
              } 
          }
          
          return root;
      }