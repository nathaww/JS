function maxOperations(nums, k) {
  const map = new Map();
  let sortedNums = nums.sort();

  let operations = 0;
  let left = 0;
  let right = sortedNums.length - 1;

  while (left < right) {
    let sum = sortedNums[left] + sortedNums[right];
    if (sum == k) {
      operations++;
      left++;
      right--;
    } else if (sum < k) {
      left++;
    } else {
      right--;
    }
  }

  return operations;
}

// Example usage
console.log(maxOperations([1, 2, 3, 4], 5)); // Output: 2
