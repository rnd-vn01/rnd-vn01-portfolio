import { getNeighborPoints } from "src/helpers/getNeighborsPoints"

test("should return the appropriate list of result - basic config", () => {
  const pointsWithinRadius2 = getNeighborPoints("LU-1", true, 2, "unlimited")

  expect(pointsWithinRadius2).toStrictEqual(["LU-2", "ST-13", "ST-14", "ST-12"])
})

test("should return the filtered list of result if defined maximum number of items to get", () => {
  const pointsWithinRadius2 = getNeighborPoints("LU-1", true, 2, 1)

  expect(pointsWithinRadius2).toStrictEqual(["LU-2"])
})

test("should exclude the points of same meridian if defined by parameters", () => {
  const pointsWithinRadius2 = getNeighborPoints("LU-1", false, 2, "unlimited")

  expect(pointsWithinRadius2).toStrictEqual(["ST-13", "ST-14", "ST-12"])
})
