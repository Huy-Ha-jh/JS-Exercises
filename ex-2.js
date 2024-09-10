
//Ex 2: Given an array of integers, find integers with the most repetitions. If multiple numbers have the same maximum number of repetition, export all of them.
//Maximum 3 rounds, not nested.
let arr = [2, 3, 3, 5, 3, 4, 1, 7]; 
let n = arr.length; 
let k = 8; 

  function maxRepeating(arr, n, k) { 
    for (let i = 0; i< n; i++) 
        arr[arr[i]%k] += k; 
 
    let max = arr[0], result = 0; 
    for (let i = 1; i < n; i++) 
    { 
        if (arr[i] > max) 
        { 
            max = arr[i]; 
            result = i; 
        } 
    } 
 
    return result; 
} 



console.log("The maximum repeating number is " + maxRepeating(arr, n, k))