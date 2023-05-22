import { validateEmail, validateURL } from 'src/helpers/validate';

test('should accept valid email', () => {
  expect(validateEmail("abc@mail.com")).toBeTruthy()
});

test('should reject invalid email with missing at part', () => {
  expect(validateEmail("abc.com")).not.toBeTruthy()
})

test('should reject invalid email with more than 1 at character', () => {
  expect(validateEmail("abc@@mail.com")).not.toBeTruthy()
})

test('should accept valid URL', async () => {
  expect(validateURL("acupuncture3d.com")).toBeTruthy()
})

test('should reject URL with only one part', async () => {
  expect(validateURL("acupuncture3d")).not.toBeTruthy()
})

test('should accept URL with IP and port included', async () => {
  expect(validateURL("http://192.168.20.1:3000")).toBeTruthy()
})
