/*
    283 move zeros
*/
/*
  two pointers advancing one after another
*/
var moveZeroes = function(nums) {
    let i = j = 0;

    /* i points to the first 0 (if there is any) */
    while (i < nums.length && nums[i] !== 0) {
        i++;
    }

    while (i < nums.length) {
        j = i + 1;

        /* j points to the first non zero after i */
        while (j < nums.length && nums[j] === 0) {
            j++;
        }

        if (j < nums.length) {
            swap(nums, i, j);

            /* i points to the first 0 after j */
            while (i < nums.length && nums[i] !== 0) {
                i++;
            }
        } else {
            break;
        }
    }
};

function swap(arr, i, j) {
    if (i === j) {
        return;
    }

    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/*
  find the first 0 at i, then for each non zero at j, move it to i and set j to 0
*/
var moveZeroes = function(nums) {
    let i = 0, j;
    while (i < nums.length && nums[i] !== 0) {
        i++;
    }

    j = i + 1;
    for (j; j < nums.length; j++) {
        if (nums[j] !== 0) {
            nums[i] = nums[j];
            nums[j] = 0;
            i++;
        }
    }

    /*
    // using while loop to find non zero numbers
    while (j < nums.length) {
        while (j < nums.length && nums[j] === 0) {
            j++;
        }

        if (j < nums.length) {
            nums[i] = nums[j];
            nums[j] = 0;
            i++;
        }
    }
    */
};

/*
  shift non zeros to the front of the array and fill the rest of the array with zero
*/
var moveZeroes = function(nums) {
    let i = j = 0;
    for (j; j < nums.length; j++) {
        if (nums[j] !== 0) {
            nums[i] = nums[j];
            i++;
        }
    }

    while (i < nums.length) {
        nums[i] = 0;
        i++;
    }

    /*
    while (j < nums.length) {
        while (j < nums.length && nums[j] === 0) {
            j++;
        }

        if (j < nums.length) {
            nums[i] = nums[j];
            nums[j] = 0;
            i++;
        }
    }
    */



};
