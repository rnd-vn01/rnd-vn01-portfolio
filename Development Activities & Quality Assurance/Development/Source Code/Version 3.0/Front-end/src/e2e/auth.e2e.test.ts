import puppeteer from 'puppeteer';
let browser = null;
let page = null;

jest.setTimeout(60000);

describe("Authentication - Log in", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080
    });
  })

  afterAll(async () => {
    await browser.close();
  })

  beforeEach(async () => {
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });
  })

  describe("Normal login", () => {
    it("test normal sign in missing email", async () => {
      const loginButton = await page.waitForSelector('aria/button-login')
      await loginButton.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/auth/signin/missing-email.jpg',
        quality: 100,
      });

      const errorDOM = await page.waitForSelector('.login-page__input--email p')
      const errorMessage = await errorDOM.evaluate(el => el.textContent)
      expect(errorMessage).toBe('Your email is invalid!')
    })

    it("test normal sign in invalid email", async () => {
      const inputEmail = await page.$('input[name="email"]')
      await inputEmail.click();
      await page.type('input[name="email"]', "test@@gmail.com")

      const loginButton = await page.waitForSelector('aria/button-login')
      await loginButton.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/auth/signin/invalid-email.jpg',
        quality: 100,
      });

      const errorDOM = await page.waitForSelector('.login-page__input--email p')
      const errorMessage = await errorDOM.evaluate(el => el.textContent)
      expect(errorMessage).toBe('Your email is invalid!')
    })

    it("test normal sign in missing password", async () => {
      const inputEmail = await page.$('input[name="email"]')
      await inputEmail.click();
      await page.type('input[name="email"]', "test@gmail.com")

      const loginButton = await page.waitForSelector('aria/button-login')
      await loginButton.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/auth/signin/missing-password.jpg',
        quality: 100,
      });

      const errorDOM = await page.waitForSelector('.login-page__input--password p')
      const errorMessage = await errorDOM.evaluate(el => el.textContent)
      expect(errorMessage).toBe('Your password is invalid!')
    })

    it("test normal sign in invalid password", async () => {
      const inputEmail = await page.$('input[name="email"]')
      await inputEmail.click();
      await page.type('input[name="email"]', "test@gmail.com")

      const inputPassword = await page.$('input[name="password"]')
      await inputPassword.click();
      await page.type('input[name="password"]', "abcde")


      const loginButton = await page.waitForSelector('aria/button-login')
      await loginButton.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/auth/signin/invalid-password.jpg',
        quality: 100,
      });

      const errorDOM = await page.waitForSelector('.login-page__input--password p')
      const errorMessage = await errorDOM.evaluate(el => el.textContent)
      expect(errorMessage).toBe('Your password is invalid!')
    })

    it("test normal sign in valid information", async () => {
      const inputEmail = await page.$('input[name="email"]')
      await inputEmail.click();
      await page.type('input[name="email"]', "test@gmail.com")

      const inputPassword = await page.$('input[name="password"]')
      await inputPassword.click();
      await page.type('input[name="password"]', "abcdef")


      const loginButton = await page.waitForSelector('aria/button-login')
      await loginButton.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/auth/signin/valid-login.jpg',
        quality: 100,
      });
    })
  })

  describe("Google login", () => {
    it("test Google login", async () => {
      const loginButton = await page.waitForSelector('aria/button-login-google')
      await loginButton.click();

      await page.waitForTimeout(5000);

      const pageList = await browser.pages();
      const newPage = await pageList[pageList.length - 1];

      await newPage.waitForSelector(`#identifierId`);
      await newPage.type(`#identifierId`, 'nguyencaonhan001@gmail.com', { delay: 5 });
      await newPage.click('#identifierNext');

      await page.waitForTimeout(3000);

      // Expect not safe box
      await newPage.screenshot({
        path: 'src/e2e/artifacts/auth/signin/google-login.jpg',
        quality: 100,
      });
    })
  })
})

describe("Authentication - Sign up", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080
    });
  })

  afterAll(async () => {
    await browser.close();
  })

  beforeEach(async () => {
    await page.goto('http://localhost:3000/signup', { waitUntil: 'networkidle0' });
  })

  describe("Normal login", () => {
    it("test normal sign up missing name", async () => {
      const createAccountButton = await page.waitForSelector('aria/button-create-account')
      await createAccountButton.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/auth/signup/missing-name.jpg',
        quality: 100,
      });

      const errorDOM = await page.waitForSelector('.create-account-page__input--name p')
      const errorMessage = await errorDOM.evaluate(el => el.textContent)
      expect(errorMessage).toBe('Please fill in your name!')
    })

    it("test normal sign up missing email", async () => {
      const inputName = await page.$('input[name="name"]')
      await inputName.click();
      await page.type('input[name="name"]', "Test Name")

      const createAccountButton = await page.waitForSelector('aria/button-create-account')
      await createAccountButton.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/auth/signup/missing-email.jpg',
        quality: 100,
      });

      const errorDOM = await page.waitForSelector('.create-account-page__input--email p')
      const errorMessage = await errorDOM.evaluate(el => el.textContent)
      expect(errorMessage).toBe('Your email is invalid!')
    })

    it("test normal sign up invalid email", async () => {
      const inputName = await page.$('input[name="name"]')
      await inputName.click();
      await page.type('input[name="name"]', "Test Name")

      const inputEmail = await page.$('input[name="email"]')
      await inputEmail.click();
      await page.type('input[name="email"]', "test@@gmail.com")

      const createAccountButton = await page.waitForSelector('aria/button-create-account')
      await createAccountButton.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/auth/signup/invalid-email.jpg',
        quality: 100,
      });

      const errorDOM = await page.waitForSelector('.create-account-page__input--email p')
      const errorMessage = await errorDOM.evaluate(el => el.textContent)
      expect(errorMessage).toBe('Your email is invalid!')
    })

    it("test normal sign up missing password", async () => {
      const inputName = await page.$('input[name="name"]')
      await inputName.click();
      await page.type('input[name="name"]', "Test Name")

      const inputEmail = await page.$('input[name="email"]')
      await inputEmail.click();
      await page.type('input[name="email"]', "test@gmail.com")

      const createAccountButton = await page.waitForSelector('aria/button-create-account')
      await createAccountButton.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/auth/signup/missing-password.jpg',
        quality: 100,
      });

      const errorDOM = await page.waitForSelector('.create-account-page__input--password p')
      const errorMessage = await errorDOM.evaluate(el => el.textContent)
      expect(errorMessage).toBe('Your password is invalid!')
    })

    it("test normal sign up invalid password", async () => {
      const inputName = await page.$('input[name="name"]')
      await inputName.click();
      await page.type('input[name="name"]', "Test Name")

      const inputEmail = await page.$('input[name="email"]')
      await inputEmail.click();
      await page.type('input[name="email"]', "test@gmail.com")

      const inputPassword = await page.$('input[name="password"]')
      await inputPassword.click();
      await page.type('input[name="password"]', "abcde")

      const createAccountButton = await page.waitForSelector('aria/button-create-account')
      await createAccountButton.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/auth/signup/invalid-password.jpg',
        quality: 100,
      });

      const errorDOM = await page.waitForSelector('.create-account-page__input--password p')
      const errorMessage = await errorDOM.evaluate(el => el.textContent)
      expect(errorMessage).toBe('Your password is invalid!')
    })

    it("test normal sign up invalid password", async () => {
      const inputName = await page.$('input[name="name"]')
      await inputName.click();
      await page.type('input[name="name"]', "Test Name")

      const inputEmail = await page.$('input[name="email"]')
      await inputEmail.click();
      await page.type('input[name="email"]', "test@gmail.com")

      const inputPassword = await page.$('input[name="password"]')
      await inputPassword.click();
      await page.type('input[name="password"]', "abcde")

      const createAccountButton = await page.waitForSelector('aria/button-create-account')
      await createAccountButton.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/auth/signup/invalid-password.jpg',
        quality: 100,
      });

      const errorDOM = await page.waitForSelector('.create-account-page__input--password p')
      const errorMessage = await errorDOM.evaluate(el => el.textContent)
      expect(errorMessage).toBe('Your password is invalid!')
    })

    it("test normal sign up invalid password confirmation", async () => {
      const inputName = await page.$('input[name="name"]')
      await inputName.click();
      await page.type('input[name="name"]', "Test Name")

      const inputEmail = await page.$('input[name="email"]')
      await inputEmail.click();
      await page.type('input[name="email"]', "test@gmail.com")

      const inputPassword = await page.$('input[name="password"]')
      await inputPassword.click();
      await page.type('input[name="password"]', "abcdef")

      const inputConfirmPassword = await page.$('input[name="confirm-password"]')
      await inputConfirmPassword.click();
      await page.type('input[name="confirm-password"]', "abcdee")

      const createAccountButton = await page.waitForSelector('aria/button-create-account')
      await createAccountButton.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/auth/signup/invalid-password-confirmation.jpg',
        quality: 100,
      });

      const errorDOM = await page.waitForSelector('.create-account-page__input--confirm-password p')
      const errorMessage = await errorDOM.evaluate(el => el.textContent)
      expect(errorMessage).toBe('Invalid confirmation!')
    })

    it("test normal sign up valid information", async () => {
      const inputName = await page.$('input[name="name"]')
      await inputName.click();
      await page.type('input[name="name"]', "Test Name")

      const inputEmail = await page.$('input[name="email"]')
      await inputEmail.click();
      await page.type('input[name="email"]', "test@gmail.com")

      const inputPassword = await page.$('input[name="password"]')
      await inputPassword.click();
      await page.type('input[name="password"]', "abcdef")

      const inputConfirmPassword = await page.$('input[name="confirm-password"]')
      await inputConfirmPassword.click();
      await page.type('input[name="confirm-password"]', "abcdef")

      const createAccountButton = await page.waitForSelector('aria/button-create-account')
      await createAccountButton.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/auth/signup/valid-signup.jpg',
        quality: 100,
      });
    })
  })

  describe("Google sign up", () => {
    it("test Google login", async () => {
      const loginButton = await page.waitForSelector('aria/button-login')
      await loginButton.click();

      await page.waitForTimeout(5000);

      const pageList = await browser.pages();
      const newPage = await pageList[pageList.length - 1];

      await newPage.waitForSelector(`#identifierId`);
      await newPage.type(`#identifierId`, 'nguyencaonhan001@gmail.com', { delay: 5 });
      await newPage.click('#identifierNext');

      await page.waitForTimeout(3000);

      // Expect not safe box
      await newPage.screenshot({
        path: 'src/e2e/artifacts/auth/signup/google-login.jpg',
        quality: 100,
      });
    })
  })
})
