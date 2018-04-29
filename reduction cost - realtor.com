<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Debugging</title>
</head>
<body>
  <script>
function reductionCost(num) {
    // build a min heap
    var heap = [-1], cost = 0, totalCost = 0, i;
    for (i = 0; i < num.length; i++) {
        addToHeap(heap, num[i]);
    }
    
    console.log(heap);
    // pop the top 2 minimal, add them up and put it back to the heap
    // repeat until there is only 2 element in the heap (the first one is a place holder)
    /*
    while (heap.length > 2) {
        cost = 0;
        cost += getMinFromHeap(heap);
        cost += getMinFromHeap(heap);
        addToHeap(cost);
        totalCost += cost;
    }
    */
    
    return totalCost;
}

function addToHeap(heap, number) {
    heap.push(number);
    
    // bubble up the min value in the heap
    var i = heap.length - 1, p;
    p = Math.floor(i / 2);
    while (p > 1) {
        console.log("i: " + i + " p: " + p);
        console.log(heap[i] + " " + heap[p]);
        if (heap[p] > heap[i]) {
           swap(heap, p, i);     
        }
        
        i = p;
        p = Math.floor(p / 2);
        console.log(heap);
    }
}

function swap(heap, i, j) {
    var temp = 0;
    temp = heap[i];
    heap[i] = heap[j] ;
    heap[j] = temp;
}

function getMinFromHeap(heap) {
    if (heap.length === 1) {
        console.log("empty heap");
        return -1;
    }
    
    var min = heap[1], i = 1, left, right, next;
    while (i < heap.length) {
        left = 2*i;
        right = left + 1;
        next = findMinChild(heap, left, right);
        if (next) {
            heap[i] = heap[next];
            i = next;
        } 
    }
    
    heap.pop();
    return min;
}

function findMinChild(heap, left, right){
    var next = null;
    if (right < heap.length){
        if (heap[right] < heap[left]) {
            next = right;
        } else {
            next = left;
        }
    } else if (left < heap.length) {
        next = left;
    }
    
    return next;
}

console.log(reductionCost([4, 2, 1, 3]));
  </script>
<body>
</html>