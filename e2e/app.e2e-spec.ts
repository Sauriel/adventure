import { Adventure2Page } from './app.po';

describe('adventure2 App', function() {
  let page: Adventure2Page;

  beforeEach(() => {
    page = new Adventure2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
