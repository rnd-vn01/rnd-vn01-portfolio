import { createNewAccount, getAccountInfo, login, updateProfile } from "src/helpers/api/auth";
import { resetToInitialStateAuthSlice } from "src/redux/slice";
import store from "src/redux/store";
import { mockAuth } from "../mocks/auth/mockAuth"

const SKELETON = {
  firebase_id: "VALID",
  email: "test@gmail.com",
  image: "imageURL",
  name: "Name",
  roles: ["user"]
}

describe("apiAuth", () => {
  beforeAll(() => {
    mockAuth();
  })

  afterEach(() => {
    store.dispatch(resetToInitialStateAuthSlice())
  })

  describe("create new account", () => {
    it("should accept valid account creation request", async () => {
      const result = await createNewAccount({
        ...SKELETON,
      })

      expect(result).toStrictEqual(SKELETON)
    })

    it("should reject invalid account creation request", async () => {
      try {
        const result = await createNewAccount({
          ...SKELETON,
          firebase_id: "INVALID"
        })
      } catch (e) {
        expect(e.response.status).toBe(500)
        expect(e.response.data).toStrictEqual({})
      }
    })
  })

  describe("get account info", () => {
    it("should return info for valid get account info request", async () => {
      const result = await getAccountInfo("VALID")
      expect(result).toStrictEqual(SKELETON)
    })

    it("should return empty object for invalid get account info request", async () => {
      const result = await getAccountInfo("INVALID")
      expect(result).toStrictEqual({})
    })
  })

  describe("update profile", () => {
    it("should return the result on valid updating request", async () => {
      const result = await updateProfile({ ...SKELETON })
      expect(result).toBeTruthy()
    })
  })

  describe("login", () => {
    it("should return the access token on valid login request", async () => {
      const result = await login("VALID")
      expect(result).toBeTruthy()
    })
  })
})
