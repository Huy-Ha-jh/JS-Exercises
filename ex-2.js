
//Ex 2: Given an array of integers, find integers with the most repetitions. If multiple numbers have the same maximum number of repetition, export all of them.
//Maximum 3 rounds, not nested.

  const arr = [1, 2, 2, 3, 4, 4, 4, 5, 5, 5, 6];

  const findMostRepetitions = (arr) => {
    // Step 1: Count occurrences of each number
    const countMap = arr.reduce((count, num) => {
      count[num] = (count[num] || 0) + 1;
      return count;
    }, {});

    // Step 2: Find the maximum occurrence
    const maxCount = Math.max(...Object.values(countMap));

    // Step 3: Filter numbers that have the maximum count
    const mostRepeatedNumbers = Object.keys(countMap)
      .filter(num => countMap[num] === maxCount)
      .map(Number); // Convert back to numbers since Object.keys returns strings
    
    return mostRepeatedNumbers;
  };

  const result = findMostRepetitions(arr);
  console.log(result); // Output: [4, 5]