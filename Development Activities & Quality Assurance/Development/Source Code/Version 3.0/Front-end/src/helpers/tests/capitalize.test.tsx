import { capitalize, capitalizeEachWord } from "src/helpers/capitalize"

test("should return empty string if passed as empty to capitalize function", () => {
  expect(capitalize("")).toBe("")
})

test("should return empty string if passed as null to capitalizeEachWord function", () => {
  expect(capitalizeEachWord(null)).toBe("")
})
