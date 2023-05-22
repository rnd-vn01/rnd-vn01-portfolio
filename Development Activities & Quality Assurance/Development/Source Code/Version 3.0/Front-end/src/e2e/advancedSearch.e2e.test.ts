import puppeteer from 'puppeteer';
import { mockGetItems } from 'src/api/mocks/items/mockGetItems';
let browser = null;
let page = null;

jest.setTimeout(60000);

describe("Advanced Search", () => {
  beforeAll(async () => {
    mockGetItems();
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
    await page.setRequestInterception(true);
    page.on('request', interceptedRequest => {
      interceptedRequest.continue();
    });
    await page.goto('http://localhost:3000/advanced-search', { waitUntil: 'networkidle2' });
  })

  it("test normal search for advanced search", async () => {
    await page.type('aria/search-input', 'a')
    await page.screenshot({
      path: 'src/e2e/artifacts/advanced-search/normal.jpg',
      quality: 100,
    });
  })
})
