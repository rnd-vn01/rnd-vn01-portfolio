import puppeteer from 'puppeteer';
let browser = null;
let page = null;

jest.setTimeout(60000);

describe("Home page", () => {
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
    await page.goto('http://localhost:3000/');

    // Wait to close landing page
    await page.waitForTimeout(10000);
  })

  describe("test model zoom mode", () => {
    it("zoom mode 1", async () => {
      const selector = '.model-interaction-control__zoom--box';
      const input = await page.$(selector);
      await input.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/home/zoom1.jpg',
        quality: 100,
      });

      await input.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/home/zoom2.jpg',
        quality: 100,
      });

      await input.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/home/zoom3.jpg',
        quality: 100,
      });
    })

    it("zoom mode 2", async () => {
      const selector = '.model-interaction-control__zoom--box';
      const input = await page.$(selector);
      await input.click();
      await input.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/home/zoom2.jpg',
        quality: 100,
      });
    })

    it("zoom mode 3", async () => {
      const selector = '.model-interaction-control__zoom--box';
      const input = await page.$(selector);
      await input.click();
      await input.click();
      await input.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/home/zoom3.jpg',
        quality: 100,
      });
    })
  })

  describe("test control", () => {
    it("left control", async () => {
      const selector = '.model-interaction-control__control--left';
      const control = await page.$(selector);

      for (let i = 0; i < 10; i++) {
        await control.click();
      }

      await page.screenshot({
        path: 'src/e2e/artifacts/home/control-left.jpg',
        quality: 100,
      });
    })

    it("right control", async () => {
      const selector = '.model-interaction-control__control--right';
      const control = await page.$(selector);

      for (let i = 0; i < 10; i++) {
        await control.click();
      }

      await page.screenshot({
        path: 'src/e2e/artifacts/home/control-right.jpg',
        quality: 100,
      });
    })

    it("up control", async () => {
      // Wait to close landing page
      await page.waitForTimeout(10000);

      const selector = '.model-interaction-control__control--up';
      const control = await page.$(selector);

      for (let i = 0; i < 10; i++) {
        await control.click();
      }

      await page.screenshot({
        path: 'src/e2e/artifacts/home/control-up.jpg',
        quality: 100,
      });
    })

    it("down control", async () => {
      // Wait to close landing page
      await page.waitForTimeout(10000);

      const selector = '.model-interaction-control__control--down';
      const control = await page.$(selector);

      for (let i = 0; i < 10; i++) {
        await control.click();
      }

      await page.screenshot({
        path: 'src/e2e/artifacts/home/control-down.jpg',
        quality: 100,
      });
    })

    it("center control", async () => {
      // Wait to close landing page
      await page.waitForTimeout(10000);

      let control = await page.$(`.model-interaction-control__control--left`);
      for (let i = 0; i < 3; i++) {
        await control.click();
      }

      control = await page.$(`.model-interaction-control__control--up`);
      for (let i = 0; i < 2; i++) {
        await control.click();
      }

      control = await page.$(`.model-interaction-control__control--center`);
      await control.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/home/control-center.jpg',
        quality: 100,
      });
    })
  })

  describe("test select meridian", () => {
    it("choose SI", async () => {
      const selector = '.meridian-control-desktop__control--right';
      const control = await page.$(selector);

      await control.click();
      await control.click();
      await control.click();

      const meridianOption = await page.$(`aria/meridian-control-item-5`);
      await meridianOption.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/home/select-meridian.jpg',
        quality: 100,
      });
    })

    it("choose then deselect", async () => {
      const meridianOption = await page.$(`aria/meridian-control-item-1`);
      await meridianOption.click();
      await meridianOption.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/home/select-meridian-then-deselect.jpg',
        quality: 100,
      });
    })
  })

  describe("test show menu", () => {
    it("show menu if clicked on the icon", async () => {
      const selector = '.auth-bar__menu--button-logo';
      const control = await page.$(selector);
      await control.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/home/show-menu.jpg',
        quality: 100,
      });
    })

    it("show menu if clicked on the icon then hide if clicked the same", async () => {
      // Wait to close landing page
      await page.waitForTimeout(10000);

      const selector = '.auth-bar__menu--button-logo';
      const control = await page.$(selector);
      await control.click();
      await control.click();

      await page.screenshot({
        path: 'src/e2e/artifacts/home/show-menu-then-hide.jpg',
        quality: 100,
      });
    })
  })
})
