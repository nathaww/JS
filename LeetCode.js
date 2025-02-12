////////////////// Duplicate

// const numbers = [1, 2, 3, 4, 5, 9, 6];

// function dup(num) {
//     const seen = new Set();

//     for (const number of num) {
//         if (seen.has(number)) {
//             return true;
//         }
//         seen.add(number);
//     }
//     return false;
// }

// console.log(dup(numbers));

// Missing Number

// let num = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// function Missing(value) {
//     const n = Math.max(...value);
//     const expectedSum = (n * (n + 1)) / 2;
//     const actualSum = value.reduce((acc, curr) => acc + curr, 0);
//     return expectedSum - actualSum;
// }

// console.log(Missing(num));

///////////////// Find all missing numbers

// let num = [1, 3, 4, 5, 6, 8];

// function missingNumbers(nums) {
//   let set = new Set(nums);
//   let result = [];

//   for (let i = Math.min(...nums); i < Math.max(...nums); i++) {
//     if (!set.has(i)) {
//       result.push(i);
//     }
//   }
//   return result
// }

// console.log(missingNumbers(num));

/////////////////// Two Sum

// num = [2, 7, 11, 15]; //should output [0, 1]

// // brute force
// function TwoSum(array, target) {
//   const length = array.length;
//   let ans = [];

//   for (let i = 0; i < length; i++) {
//     for (let j = i + 1; j < length; j++) {
//       if (target == array[i] + array[j]) {
//         ans.push(i);
//         ans.push(j);
//       }
//     }
//   }

//   return ans;
// }

// // optimized
// function TwoSumO(array, target) {
//     let map = new Map();

//     for(let i = 0; i < array.length; i++){
//         const complement = target - num[i]

//         if(map.has(complement)){
//             return [map.get(complement), i]
//         }else {
//             map.set(num[i], i)
//         }
//     }

//     return []
// }

// console.log(TwoSum(num, 26));
// console.log(TwoSumO(num, 26));

///////////////////  How many numbers a re smaller than the current number
// num = [8, 1, 2, 2, 3];
// function howMany(array) {
//   const length = array.length;
//   const ans = [];

//   for (let i = 0; i < length; i++) {
//     let count = 0;
//     for (let j = i + 1; i < length; j++) {
//       if (array[i] > array[j]) {
//         count++;
//       } else {
//         ans.push(count);
//       }
//     }
//   }
//   return ans;
// }

// console.log(howMany(num));

// for(let i = 0; i < 10; i++){
//     setTimeout(() => {
//         console.log(i)
//     }, 1000)
// }

// for(var i = 0; i < 10; i++){
//     setTimeout(() => {
//         console.log(i)
//     }, 1000)
// }
// const text = "x n m"
// const boldChars = Array.from({ length: text.length }, () => 0);
// const arry = [];
// arry.length = text.length;
// arry.fill(0, 0, text.length)

// console.log(boldChars, arry)
