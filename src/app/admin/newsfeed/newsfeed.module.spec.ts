import { NewsfeedModule } from './newsfeed.module';

describe('NewsfeedModule', () => {
  let newsfeedModule: NewsfeedModule;

  beforeEach(() => {
    newsfeedModule = new NewsfeedModule();
  });

  it('should create an instance', () => {
    expect(newsfeedModule).toBeTruthy();
  });
});
