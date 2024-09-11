
//Ex 2: Given an array of integers, find integers with the most repetitions. If multiple numbers have the same maximum number of repetition, export all of them.
//Maximum 3 rounds, not nested.
// const arr = [1, 2, 2, 3, 3, 3, 4, 4, 4];
const arr = [1, 2, 2, 3, 3, 3, 4, 4, 4, 5,5,5,5,5];

function findMostRepeated(arr) {
    const countMap = {};
    let maxReps = 0;
    const result = [];
  
   
    for (let i = 0; i < arr.length; i++) {
      const num = arr[i];
      countMap[num] = (countMap[num] || 0) + 1;
      maxReps = Math.max(maxReps, countMap[num]);
    }
  
    for (let num in countMap) {
      if (countMap[num] === maxReps) {
        result.push(Number(num));
      }
    }
  
    return result;
  }
  

  const result = findMostRepeated(arr);
  console.log(result);
  