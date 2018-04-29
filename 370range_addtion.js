// #370 range addition
/*
Given:

    length = 5,
    updates = [
        [1,  3,  2],
        [2,  4,  3],
        [0,  2, -2]
    ]

Output:

    [-2, 0, 3, 5, 3]
    */
    
function rangeAddition(length, updates) {
            if (length < 0 || !Array.isArray(updates)) return new Array(length);
        
            var result = new Array(length), i, j;
            for (i=0; i<updates.length; i++){
                if (updates[i].length !== 3) return new Array(length);
                for (j=updates[i][0]; j < updates[i][1]; j++) {
                        if (j < 0 || j >= length) return new Array(length);
                    result[j] += update[i][2]
                } 
            }
        
            return result;
}

    