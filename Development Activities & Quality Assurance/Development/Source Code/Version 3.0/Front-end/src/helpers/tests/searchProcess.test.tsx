import { passFilter, SEARCH_BY, sortItems } from 'src/helpers/searchProcess';

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

test("should search on all valid criteria if requested - true case", async () => {
  expect(passFilter(EXAMPLE_POINT, "at", true, SEARCH_BY.ALL)).toBeTruthy()
})

test("should search on all valid criteria if requested - true case", async () => {
  expect(passFilter(EXAMPLE_MERIDIAN, "ip", false, SEARCH_BY.ALL)).toBeTruthy()
})

test("should search on all valid criteria if requested - false case", async () => {
  expect(passFilter(EXAMPLE_POINT, "hh", true, SEARCH_BY.ALL)).not.toBeTruthy()
})

test("should search on all valid criteria if requested - false case", async () => {
  expect(passFilter(EXAMPLE_MERIDIAN, "nn", false, SEARCH_BY.ALL)).not.toBeTruthy()
})

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

const MOCK_DATA_FOR_SORT = [
  {
    code: "Ren"
  },
  {
    code: "LU"
  },
  {
    code: "LU-3"
  },
  {
    code: "BL-11"
  },
  {
    code: "BL-2"
  },
]

test("should sort the results", async () => {
  const results = sortItems(MOCK_DATA_FOR_SORT, 0);
  expect(results).toStrictEqual([
    { code: 'BL-2' }, { code: 'BL-11' }, { code: 'LU-3' }, { code: 'LU' }, { code: 'Ren' }
  ])
})

test("should flip the sorted results if chosen sort by descending", async () => {
  const results = sortItems(MOCK_DATA_FOR_SORT, 1);
  expect(results).toStrictEqual([
    { code: 'Ren' }, { code: 'LU' }, { code: 'LU-3' }, { code: 'BL-11' }, { code: 'BL-2' }
  ])
})
