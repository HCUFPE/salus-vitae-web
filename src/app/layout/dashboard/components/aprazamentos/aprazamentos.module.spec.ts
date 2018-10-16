import { AprazamentosModule } from './aprazamentos.module';

describe('AprazamentosModule', () => {
  let aprazamentosModule: AprazamentosModule;

  beforeEach(() => {
    aprazamentosModule = new AprazamentosModule();
  });

  it('should create an instance', () => {
    expect(aprazamentosModule).toBeTruthy();
  });
});
