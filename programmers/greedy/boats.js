function solution(people, limit) {
  people = people.sort((a, b) => a - b)
  let [left, right] = [0, people.length - 1]

  let boats = 0
  while (left <= right) {
    if (people[left] + people[right] <= limit) {
      left += 1
    }

    right -= 1
    boats += 1
  }

  return boats
}
