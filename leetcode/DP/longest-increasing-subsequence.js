var lengthOfLIS = function (nums) {
  let memoize = Array(nums.length).fill(-1)
  const DP = index => {
    if (memoize[index] > 0) {
      return memoize[index]
    }

    let subsequence = 1
    for (let pointer = 0; pointer < index; pointer++) {
      if (nums[index] > nums[pointer]) {
        subsequence = Math.max(subsequence, DP(pointer) + 1)
      }
    }

    memoize[index] = subsequence
    return subsequence
  }

  let longest = 0
  for (let i = 0; i < nums.length; i++) {
    longest = Math.max(longest, DP(i))
  }

  return longest
}

var lengthOfLIS = function (nums) {
  let memoize = Array(nums.length).fill(1)
  let longest = 1
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        memoize[i] = Math.max(memoize[i], memoize[j] + 1)
        longest = Math.max(longest, memoize[i])
      }
    }
  }

  return longest
}
