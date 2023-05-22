import { waitFor } from "@testing-library/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { logInWithEmailAndPassword } from "./firebase";

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(() => {
    return Promise.resolve('signInWithEmailAndPassword')
  }),
  getAuth: jest.fn(() => { }),
  GoogleAuthProvider: jest.fn().mockImplementation(() => {
    return {
      addScope: jest.fn()
    }
  }),
}));

test("logInWithEmailAndPassword", async () => {
  await logInWithEmailAndPassword("email", "password")
  expect(signInWithEmailAndPassword).toHaveBeenCalled()
})
