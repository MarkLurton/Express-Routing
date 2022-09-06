function findMedian(nums) {
  nums.sort();
  let median;
  if (nums.length % 2 === 1) {
    median = nums[Math.floor(nums.length / 2)];
  } else {
    median = (nums[nums.length / 2 - 1] + nums[nums.length / 2]) / 2;
  }
  return median;
}

function findMean(nums) {
  let sum = 0;
  for (let num of nums) {
    sum += num;
  }
  let mean = sum / nums.length;
  return mean;
}

function findMode(nums) {
  const uniqueNums = new Set(nums);
  let mode;
  for (let num of uniqueNums) {
    if (!mode) {
      mode = num;
      continue;
    }
    if (
      nums.filter((number) => number == num).length >
      nums.filter((number) => number == mode).length
    ) {
      mode = num;
    }
  }
  return mode;
}

module.exports = {
  findMean: findMean,
  findMedian: findMedian,
  findMode: findMode,
};
