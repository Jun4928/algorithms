const binarySearch = (arr, x) => {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] === x) {
      // do something in the right spot!
      return mid
    }

    if (arr[mid] > x) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return left // this is the insertion point
}

let binarySearchLeftMost = (arr, target) => {
  let left = 0
  let right = arr.length
  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] >= target) {
      right = mid
    } else {
      left = mid + 1
    }
  }

  return left
}

let binarySearchRightMost = (arr, target) => {
  let left = 0
  let right = arr.length
  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] > target) {
      right = mid
    } else {
      left = mid + 1
    }
  }

  return left
}

console.log(binarySearch([1, 2, 3, 3, 3, 3, 3, 4, 9, 9, 9, 15, 20], 9))
console.log(binarySearchLeftMost([1, 2, 3, 3, 3, 3, 3, 4, 9, 9, 9, 15, 20], 9))
console.log(binarySearchRightMost([1, 2, 3, 3, 3, 3, 3, 4, 9, 9, 9, 15, 20], 9))
