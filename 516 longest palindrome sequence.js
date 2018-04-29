/*
    516 longest palindrome subsequence
*/

/*
    daynamic programming.
    two key components of dynamic programming is overlapping problem and optimal structure. if you can model your solution as the solution of smaller subproblems and you have overlapping subproblems, there is a good chance you can use dynamic programming.
    
    a simple version of it is "if you can step 1, 2 or 3 steps at a time, how many different ways you can step up n steps". the relationship between the smaller subproblems and the original problem is clear: you have to step to k-3, k-2 or k-1 until you can step up to k. in this case, you have 3 choices at each step, so actually one of them can be considered the optimal solution depending on how you define optimal in this case. i.e., you want to reach to n as fast as possible, of course you want to take 3 steps at a time. the optimal structure lies in, if you choose a path that is optimal, at any given point of the path (at any given choice), the path before and after that point is also optimal, so you can "suture" the sub paths together to get your larger optimal path. in this case, it's actually greedy because it's easy to tell that take 3 steps a time will get you to n fastest. sometime you are not this lucky so you have to enumerate all possibilities to see which choice you make at each given step will yield the final optimal solution.
    
    consider the burst balloon problem. you are taking steps (making choices) to burst all balloons. let's check each of the two components of dynamic programming. since all balloons needs to be burst eventually, when you have only one balloon left, every other balloons on the left and right side of this balloon must have been burst already. to burst the left side and the right side, it's a smaller sub problem with basically the same nature. you do have overlapping subproblems here because to burst k on the left or right, you need to burst 1 to k-1, to burst k-1,  you need to burst 1 to k-2 (assuming k>3), so burst k-2 is a overlapping subproblem for k-1 and k (and anything that's after k of course). how about optimal structure, since this question is asking the burst strategy that yield the largest bonus. at each step, we can choose any balloon that is not burst yet, however, one of these choices will be on the path that yield the largest bonus. can you tell which one just by looking at your current step? unfortunately you can't. you will have to enumerate all possibilities and track which path (plan, strategy, order, etc.) yields the largest bonus. if you solve the problems on a smaller scale and cache those result, you will be able reuse the solutions of these smaller subproblems. 
    
    i.e., to burst b1, b2, b3, b4, b5, b6, b7. if you choose to burst b3 as your last step, you need to solve b1, b2 and b4 to b7 first. zoom in to the b4 to b7 subproblem, if you choose to burst b6 as your last step, you need to burst b4, b5 first. now if you choose to burst b5 as your last step, you nned to solve b1 to b5 first. zoom in to b1 to b5, now if you choose to burst b3, you need to solve b1, b2 first and this is overlapping subproblem when you choose b3 as your last step for the entire problem. so by solving subproblems that have only 2 baloon and cache the results, you won't be solving the same subprolem over and over again.
    
    the next question is how do you cache the subproblems. in this case, since the subproblems are basically subarray of the origin array if you see the sequence of balloons and their burst bonus value as an array. so a 2d matrix will be enough. sometimes a vector (or an array) will be enough for the caching, i.e., longest increasing sub sequence problem or cutting rod problem. however, you may not always be able to cache the subproblems easily if they are not consecutive sub sequence of your original problem. (discuss later)
    
    it's not always obvious how to model the structure of the solution. i.e., i found the can i win problem is not that obvious. the common strategy is to see the problem either from the first step, the last step or a step in the middle.
    
*/

/*
    bbabcbcab
    longest palindrom subsequence. if we pick a letter or a pair of letters next to each other as the center of the palindrom (a single letter can be a palindrom or two equal letters can be a palindrom to, then if you are to extend the palindrom on both sides, you get a longer palindrom). the next step is to find from the center, going left and right, how long we are able to extend this palindrom. if we do this for all possible centers (each letter and each consecutive equal 2 letters), we will be able to find the longest palindrom. overlapping subproblems? maybe not, because by modeling the problem as first find a center and then extend, we can't say a smaller palindrom on the left or right side of the center will be helpful (if there mirror each other then yes, but that's special case). however there are overlapping subproblems in a different way.
    
    i.e., if i pick c (the one in the middle) as the center of my palindrom, then my problem becomes, what is the longest subsequence in bbab and bcab that mirrors each other. this can be found be setting up two pointer and move to left and right respectively while trying to match the longest  sub sequences that mirrors each other. now compare the following two cases.
    
    b b a b c b c a b
        i   k   j  
        
    b b a b c b c a b
        i k j ->j   
        
    when b is the center, if you choose move j to the right to find a match for a, you will encounter the second c, now the question becomes, what is the longest subsequence in b b a and c a b that mirrors each other. this is the same subproblem if you choose the middle c as the center, two b on the left and right match, then you are looking at i pointing at a and c pointing at j.
    
    if overlapping problems exist, there is a chance we can solve them first (systematically following a certain order) and reuse them later. now let's see how we can constuct the solution from smaller sub problems. from the analysis above, we see that subproblems exist on the very end of the sequence. so if we have an i to the very left and we know how it is matched to a j to the very right, once we are moving towards the center of the sequence, we can reuse them (as we've discussed above).
    
    if we start from index 0, and see which is the far right letter we can match it. now the question is, in the overall longest palindrom subsequence, does b at 0 match to b at the end of the string s. assuming there is another b closer to the center that matches the first b, if this centered b instead should be included in the longest palindrome, then there must be some other letters that between this b and the last b that matches to some letter before the first b, but this is impossible because b is already the very first letter. or if there are other letters that are on the left of the first b, since we are matching from two ends to the center, these letters must have been matched, so when we reach the first b, we will reuse whatever that is already matched, for each one of these match, we look towards the center to see a match for b, in this case, for the first b, the other b closer to the center is still the far right considering we are looking for the longest palindrom (it won't make sense if we ignore the matching letters and go for the further b).
*/

    var longestPalindromeSubseq = function(s) {
        if (!s || s.length <= 1) {
            return s && s.length || 0;
        }

        var max = {val: 1}, hash = {};
        longestPalindromeRecursion(s, 0, s.length - 1, hash, max);
        //console.log(hash);
        return max.val;
    };

    function longestPalindromeRecursion(s, low, high, hash, max) {
        let key = s.substring(low, high + 1);
        if (hash[key]) {
            return hash[key];
        }
        
        if (low === high) {
            hash[key] = 1;
            return 1;
        }  
        
        if (low + 1 === high && s[low] === s[high]) {
            hash[key] = 2;
            if (max.val < 2) {
                max.val = 2;
            }
            
            return 2;
        }

        if (s[low] === s[high]) {
            hash[key] = longestPalindromeRecursion(s, low +1, high - 1, hash, max) + 2;
        } else {
            hash[key] = Math.max(longestPalindromeRecursion(s, low +1, high, hash, max),
                                 longestPalindromeRecursion(s, low, high - 1, hash, max));
        }

        if (hash[key] > max.val) {
            max.val = hash[key];
        }
        
        return hash[key];
    }
    
      /*
      console.log(longestPalindromeSubseq("bbabcbcab"));
      console.log(longestPalindromeSubseq("euazbipzncptldueeuechubrcourfpftcebikrxhybkymimgvldiwqvkszfycvqyvtiwfckexmowcxztkfyzqovbtmzpxojfofbvwnncajvrvdbvjhcrameamcfmcoxryjukhpljwszknhiypvyskmsujkuggpztltpgoczafmfelahqwjbhxtjmebnymdyxoeodqmvkxittxjnlltmoobsgzdfhismogqfpfhvqnxeuosjqqalvwhsidgiavcatjjgeztrjuoixxxoznklcxolgpuktirmduxdywwlbikaqkqajzbsjvdgjcnbtfksqhquiwnwflkldgdrqrnwmshdpykicozfowmumzeuznolmgjlltypyufpzjpuvucmesnnrwppheizkapovoloneaxpfinaontwtdqsdvzmqlgkdxlbeguackbdkftzbnynmcejtwudocemcfnuzbttcoew"));
      
      console.log(longestPalindromeSubseq("aa"));
      */
      
      /*
        error report
        algorithm:
        1. the first version caches the range i-j of the substring, this exceeds the time limit because different ranges can have the same string
        2. the second version caches the substring from i to j inclusive, this exceeds the memory limit because too much data are chached
        3. you have one more shot to try the bottom-up approach without using recursion
        
        coding:
        1. the logic that replaces the max value is wrong. if you only need to change the value when the condition is true (or false), use if instead of ? :
        
        edge cases:
        2. the edge case when there are only two equal letter left is missing. this case is for palindromes that have even numbers of letters    
      */






































