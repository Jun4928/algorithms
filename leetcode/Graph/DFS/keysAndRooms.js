const log = console.log
/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
const canVisitAllRooms = function (rooms) {
  const visited = new Set([0])
  const queue = [0]

  while (queue.length) {
    const current = rooms[queue.shift()]
    current.forEach((nextRoom) => {
      if (!visited.has(nextRoom)) {
        queue.unshift(nextRoom)
        visited.add(nextRoom)
      }
    })
  }

  return visited.size === rooms.length
}

log(canVisitAllRooms([[1], [2], [3], []])) // true
log(canVisitAllRooms([[1, 3], [3, 0, 1], [2], [0]])) // false
