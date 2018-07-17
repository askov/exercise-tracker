const { expect } = require('chai'),
  puppeteer = require('puppeteer'),
  config = require('../../config'),
  server = require('../../server');

describe('Index page puppeteer tests', function () {
  let browser;
  let page;

  before(async function () {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  beforeEach(async function () {
    page = await browser.newPage()
    await page.goto(`http://localhost:${config.port}`);
  });

  afterEach(async function () {
    await page.close();
  });

  after(async function () {
    await browser.close();
    server.close();
  });

  it('should show error on wrong name submit', async function () {
    await page.type('input[name="name"]', '1', { delay: 100 });
    await page.click("#js-new-user-form > button");
    const err = await page.evaluate(() => document.querySelector('#js-new-user-form .error-container').innerHTML);
    expect(err).equal('* User name must contain only alphanumeric characters, underscore and start with letter');
    expect(page.url()).to.equal(`http://localhost:${config.port}/`);
  });

  let testUserId;

  it('should redirect on correct name submit', async function () {
    // page.on('response', res => {
    //   res.text()
    //   res.text().then(function (textBody) {
    //     console.log(textBody);
    //   })
    // });
    await page.type('input[name="name"]', 'samuel', { delay: 100 });
    await Promise.all([
      page.click("#js-new-user-form > button"),
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);
    expect(page.url()).to.equal(`http://localhost:${config.port}/api/exercise/new-user`);
  });

  it('should redirect on correct exercise submit', async function () {
    // TODO
    // * Description required
    // * Duration should be number (mins)
  });


});