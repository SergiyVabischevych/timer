import { AppPage } from './app.po';
import { browser, logging, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('timer-project App Component', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display default time', () => {
    expect(page.getTitleText()).toEqual('00:00:00');
  });

  it('should display 3 buttons', () => {
    expect(page.getButtons().count()).toBe(3);
  });

  it('should start/stop button work', () => {
    const expectedTime = '00:00:05';
    page.getButtonStart().click();
    browser.waitForAngularEnabled(false);
    browser.wait(
      () => page.getTitleText().then((result: string) => result === expectedTime)
    );
    page.getButtonStop().click();
    expect(page.getButtonStart().getText()).toEqual('Start');
    expect(page.getTitleText()).toEqual(expectedTime);

    // second start timer
    page.getButtonStart().click();
    expect(page.getButtonStop().getText()).toEqual('Stop');
    expect(page.getTitleText()).toEqual('00:00:06');
  });

  it('should reset button work', () => {
    // start timer
    const expectedTime = '00:00:03';
    page.getButtonStart().click();
    browser.waitForAngularEnabled(false);
    browser.wait(
      () => page.getTitleText().then((result: string) => result === expectedTime)
    );
    expect(page.getTitleText()).toEqual(expectedTime);

    // reset timer
    page.getButtonReset().click();
    expect(page.getTitleText()).toEqual('00:00:00');
  });

  it('should wait button work', () => {
    // start timer
    const expectedTime = '00:00:03';
    page.getButtonStart().click();
    browser.waitForAngularEnabled(false);
    browser.wait(
      () => page.getTitleText().then((result: string) => result === expectedTime)
    );
    expect(page.getButtonWait().getText()).toEqual('Wait');
    expect(page.getTitleText()).toEqual(expectedTime);

    // wait button clicked
    page.getButtonWait().click();
    browser.sleep(301);
    page.getButtonWait().click();
    expect(page.getTitleText()).toEqual(expectedTime);

    // wait button dbclicked
    browser.sleep(2000);
    page.getButtonWait().click();
    browser.sleep(290);
    page.getButtonWait().click();
    expect(page.getTitleText()).toEqual('00:00:05');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
