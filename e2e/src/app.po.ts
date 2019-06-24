import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class AppPage {

  navigateTo(): Promise<any> {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText(): Promise<any> {
    return this.getAppRootContainer().element(by.css('div.timer')).getText() as Promise<string>;
  }

  getButtons(): ElementArrayFinder {
    return this.getAppRootContainer().all(by.css('div.btn-group button'));
  }

  getButtonStart(): ElementFinder {
    return this.getAppRootContainer().element(by.css('button.btn-start'));
  }

  getButtonStop(): ElementFinder {
    return this.getAppRootContainer().element(by.css('button.btn-stop'));
  }

  getButtonReset(): ElementFinder {
    return this.getAppRootContainer().element(by.css('button.btn-reset'));
  }

  getButtonWait(): ElementFinder {
    return this.getAppRootContainer().element(by.css('button.btn-wait'));
  }

  private getAppRootContainer(): ElementFinder {
    return element(by.css('app-root'));
  }
}
