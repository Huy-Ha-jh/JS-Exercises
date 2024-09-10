
//Excersize 1
const arr = [1, 2, 2, 3, 4, 4, 4, 5, 6];


// Solution 1: Using Set
const uniqueArraySet = [...new Set(arr)];
//Tạo hàm set sẽ tự động remove các biến trùng.
//dùng spread để bỏ set lại vào hàm
console.log(uniqueArraySet); // expect Output: [1, 2, 3, 4, 5, 6]

// Solution 2: Using filter and indexOf
const uniqueArrayFilter = arr.filter((value, index) => arr.indexOf(value) === index);
//filter lặp qua mảng, indexOf trả về các biến xuất hiện đầu tiên vào value, arr.indexOf(value) === index để đảm bảo 1 biến chỉ xuát hiệntrong kết quả
console.log(uniqueArrayFilter); // Expect Output: [1, 2, 3, 4, 5, 6]

// Solution 4: Using a for loop
const uniqueArrayLoop = [];
for (let i = 0; i < arr.length; i++) {
  if (!uniqueArrayLoop.includes(arr[i])) {
    uniqueArrayLoop.push(arr[i]);
  }
}
//tạo vòng lặp. kiếm tra xem nếu giá trị đó nó đã ở trong nhờ hàm include, nếu không có thì dùng hàm push bỏ vào array
console.log(uniqueArrayLoop); // Output: [1, 2, 3, 4, 5, 6]



