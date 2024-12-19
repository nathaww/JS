// Duplicate

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

// Find all missing numbers

let num = [1, 3, 4, 5, 6, 8];

function missingNumbers(nums) {
  let set = new Set(nums);
  let result = [];

  for (let i = Math.min(...nums); i < Math.max(...nums); i++) {
    if (!set.has(i)) {
      result.push(i);
    }
  }
  return result
}

console.log(missingNumbers(num));
