const {
  PriorityQueue,
  MaxPriorityQueue,
} = require('@datastructures-js/priority-queue')

// empty queue with comparator
const employeesQueue = new PriorityQueue({
  compare: (e1, e2) => {
    if (e1.salary > e2.salary) return -1 // do not swap
    if (e1.salary < e2.salary) return 1 // swap

    // salaries are the same, compare rank
    return e1.rank < e2.rank ? 1 : -1
  },
})

employeesQueue
  .enqueue({ name: 'employee 1', salary: 2000, rank: 1 })
  .enqueue({ name: 'employee 2', salary: 1500, rank: 0 })
  .enqueue({ name: 'employee 3', salary: 4000, rank: 4 })
  .enqueue({ name: 'employee 4', salary: 2000, rank: 2 })
  .enqueue({ name: 'employee 5', salary: 3000, rank: 3 })

console.log(employeesQueue.front())
console.log(employeesQueue.dequeue())
console.log(employeesQueue.front())
console.log(employeesQueue.back())
console.log(employeesQueue.toArray())
