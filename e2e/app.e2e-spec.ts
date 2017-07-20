import { AdviserPage } from './app.po';

describe('adviser App', () => {
  let page: AdviserPage;

  beforeEach(() => {
    page = new AdviserPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
