import { WebadminRoutingModule } from './webadmin-routing.module';

describe('AdminRoutingModule', () => {
  let adminRoutingModule: WebadminRoutingModule;

  beforeEach(() => {
    adminRoutingModule = new WebadminRoutingModule();
  });

  it('should create an instance', () => {
    expect(adminRoutingModule).toBeTruthy();
  });
});
