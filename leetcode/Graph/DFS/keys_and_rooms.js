/**
 * https://leetcode.com/problems/keys-and-rooms/
 * 841. Keys and Rooms
 *
 * @param {number[][]} rooms
 * @return {boolean}
 */

var canVisitAllRooms = function (rooms) {
  let seen = Array(rooms.length).fill(false)
  const DFS = (keys, room) => {
    if (seen[room]) {
      return
    }
    seen[room] = true
    for (const room of keys) {
      DFS(rooms[room], room)
    }
  }

  DFS(rooms[0], 0)
  return seen.every(is => is == true)
}
