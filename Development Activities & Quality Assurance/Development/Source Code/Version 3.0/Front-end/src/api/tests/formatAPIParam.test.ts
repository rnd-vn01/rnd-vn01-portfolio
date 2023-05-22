import { objectToFormData, objectToQuery } from "../formatAPIParam"

test("formatAPIParam converting single param to query", async () => {
  const param = {
    language: "en"
  }

  expect(objectToQuery(param)).toBe("?language=en")
})

test("formatAPIParam converting multiple params to query", async () => {
  const param = {
    language: "en",
    code: "LU-11"
  }

  expect(objectToQuery(param)).toBe("?language=en&code=LU-11")
})

test("formatAPIParam convering null params to empty string", async () => {
  expect(objectToQuery(null)).toBe("")
})

test("formatAPIParam converting multiple params to form data", async () => {
  const param = {
    language: "en",
    code: "LU-11"
  }

  const formData = objectToFormData(param)

  let countParam = 0
  for (let [key, value] of (formData as any).entries()) {
    countParam += 1
    switch (countParam) {
      case 1:
        expect(key).toBe("language")
        expect(value).toBe("en")
        break
      case 2:
        expect(key).toBe("code")
        expect(value).toBe("LU-11")
        break
    }
  }

  expect(countParam).toBe(2)
})

test("formatAPIParam converting single param as array to form data", async () => {
  const param = {
    codes: ["LU-1", "LU-2", "LU-3"],
  }

  const formData = objectToFormData(param)

  let countParam = 0
  for (let [key, value] of (formData as any).entries()) {
    countParam += 1
    expect(key).toBe("codes")
    expect(value).toBe(JSON.stringify(param.codes))
  }

  expect(countParam).toBe(1)
})
