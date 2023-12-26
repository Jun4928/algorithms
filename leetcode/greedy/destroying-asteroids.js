/**
https://leetcode.com/problems/destroying-asteroids/
2126. Destroying Asteroids
 * @param {number} mass
 * @param {number[]} asteroids
 * @return {boolean}
 */
var asteroidsDestroyed = function (mass, asteroids) {
  asteroids.sort((a, b) => (a < b ? -1 : 1))

  let theMass = mass
  for (let i = 0; i < asteroids.length; i++) {
    if (theMass < asteroids[i]) {
      return false
    }

    theMass += asteroids[i]
  }

  return true
}
