
//Excersize 1
const arr = [1, 3, 3, 3, 4, 4, 4, 5, 6, 9, 9];


// Solution 1: Using JavaScript filter() Method
function removeDuplicatesWithFilter(arr) {
  return arr.filter((item,
      index) => arr.indexOf(item) === index);
}
console.log("Solution 1: ", removeDuplicatesWithFilter(arr));

// Solution 2: Using set() Method
function removeDuplicatesWithSet(arr) {
  return [...new Set(arr)];
}

console.log("Solution 2: ", removeDuplicatesWithSet(arr));

// Solution 3: Using a for loop
function removeDuplicatesWithForLoop(arr) {
  let unique = [];
  arr.forEach(element => {
      if (!unique.includes(element)) {
          unique.push(element);
      }
  });
  return unique;
}
console.log("Solution 3: ", removeDuplicatesWithForLoop(arr));



