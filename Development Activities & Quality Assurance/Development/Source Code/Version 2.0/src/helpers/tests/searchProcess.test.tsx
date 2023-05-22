import { passFilter, SEARCH_BY } from 'src/helpers/searchProcess';

const EXAMPLE_POINT = {
  code: "GB-20",
  name: "Name",
  description: "query",
  functionalities: ["F1", "F2"],
  caution: "Caution",
  method: "Technique",
  anatomy: "Anatomy"
}

const EXAMPLE_MERIDIAN = {
  code: "LU",
  name: "Lung",
  description: "Description for Lung",
  diseases: "Diseases for Lung",
  points: ["P1", "P2"]
}

test("should filter items by description true as expected", async () => {
  expect(passFilter(EXAMPLE_POINT, "query", true, SEARCH_BY.DESCRIPTION)).toBeTruthy()
})

test("should filter items by anatomy location true as expected", async () => {
  expect(passFilter(EXAMPLE_POINT, "Anatomy", true, SEARCH_BY.LOCATION)).toBeTruthy()
})

test("should filter items by functionalities true as expected", async () => {
  expect(passFilter(EXAMPLE_POINT, "F1", true, SEARCH_BY.FUNCTIONALITIES)).toBeTruthy()
})

test("should filter items by triggering method true as expected", async () => {
  expect(passFilter(EXAMPLE_POINT, "Technique", true, SEARCH_BY.METHOD)).toBeTruthy()
})

test("should filter items by diseases true as expected", async () => {
  expect(passFilter(EXAMPLE_MERIDIAN, "Diseases", false, SEARCH_BY.FUNCTIONALITIES)).toBeTruthy()
})

test("should filter items by description false as expected", async () => {
  expect(passFilter(EXAMPLE_POINT, "query 1", true, SEARCH_BY.DESCRIPTION)).not.toBeTruthy()
})

test("should filter items by anatomy location false as expected", async () => {
  expect(passFilter(EXAMPLE_POINT, "Anatomy 1", true, SEARCH_BY.LOCATION)).not.toBeTruthy()
})

test("should filter items by functionalities false as expected", async () => {
  expect(passFilter(EXAMPLE_POINT, "F3", true, SEARCH_BY.FUNCTIONALITIES)).not.toBeTruthy()
})

test("should filter items by triggering method false as expected", async () => {
  expect(passFilter(EXAMPLE_POINT, "Technique 1", true, SEARCH_BY.METHOD)).not.toBeTruthy()
})

test("should filter items by diseases false as expected", async () => {
  expect(passFilter(EXAMPLE_MERIDIAN, "Diseases 1", false, SEARCH_BY.FUNCTIONALITIES)).not.toBeTruthy()
})
