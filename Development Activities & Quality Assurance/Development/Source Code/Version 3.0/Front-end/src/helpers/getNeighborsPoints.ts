import { POINT_LOCATIONS } from "src/configs/constants"

export const calculateDistanceBetweenPoints = (point1: any, point2: any) => {
  const location1 = point1.position;
  const location2 = point2.position;

  return Math.sqrt(Math.pow(location1[0] - location2[0], 2) +
    Math.pow(location1[1] - location2[1], 2) +
    Math.pow(location1[2] - location2[2], 2))
}

export const getNeighborPoints = (point: string, isGettingSameMeridian: boolean, maxDistance: number, numberOfPoints: number | 'unlimited') => {
  const getCurrentPoint = POINT_LOCATIONS[point]
  let results = []

  Object.keys(POINT_LOCATIONS).forEach((code) => {
    if (code !== point) {
      const distance = calculateDistanceBetweenPoints(POINT_LOCATIONS[code], getCurrentPoint)
      if (distance <= maxDistance) {
        if (!isGettingSameMeridian) {
          if (code.split("-")[0] !== point.split("-")[0]) {
            results.push({
              point: code,
              distance: distance
            })
          }
        } else {
          results.push({
            point: code,
            distance: distance
          })
        }
      }
    }
  })

  results = results.sort((a, b) => a.distance > b.distance ? 1 : -1)

  const filteredResults = numberOfPoints === "unlimited" ? results : results.slice(0, numberOfPoints);
  return filteredResults.map(item => item.point)
}


