/**
https://leetcode.com/problems/destination-city/description/
1436. Destination City
 * @param {string[][]} paths
 * @return {string}
 */
var destCity = function (paths) {
  // the city on destination but never appeas in the departure
  const departures = new Set()
  const destinations = []
  paths.forEach(([dep, des]) => {
    departures.add(dep)
    destinations.push(des)
  })

  return destinations.find(c => !departures.has(c))
}
