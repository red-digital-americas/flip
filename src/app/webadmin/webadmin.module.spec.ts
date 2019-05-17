import { WebadminModule } from './webadmin.module';

describe('AdminModule', () => {
  let adminModule: WebadminModule;

  beforeEach(() => {
    adminModule = new WebadminModule();
  });

  it('should create an instance', () => {
    expect(adminModule).toBeTruthy();
  });
});
