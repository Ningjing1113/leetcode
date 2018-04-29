/*
  819 most common word
*/

var mostCommonWord = function(paragraph, banned) {
    let bannedHash = {};
    banned.forEach(word => {
        bannedHash[word] = true;
    });

    let i = j = 0, p = paragraph, max = "", wordHash = {"": 0};
    for (j; j <= p.length; j++) {

        if (/[a-z|A-Z]/.test(p[j]) && j < p.length || j <= i) {
            continue;
        }

        /* i to j - 1 is a word */
        let word = p.substring(i, j).toLowerCase();
        if (!bannedHash.hasOwnProperty(word)) {
            if (wordHash[word] === undefined) {
                wordHash[word] = 0;
            }

            wordHash[word]++;
            max = wordHash[word] > wordHash[max] ? word : max;
        }

        /* advance i from j to the next letter. now a word occurs when j is not a letter and j > i */
        i = j;
        while (i < p.length  && !/[a-z|A-Z]/.test(p[i])) {
            i++;
        }
    }

    console.log(wordHash);
    return max;
};
