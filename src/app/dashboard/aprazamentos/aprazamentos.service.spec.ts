import { TestBed } from '@angular/core/testing';

import { AprazamentosService } from './aprazamentos.service';

describe('AprazamentosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AprazamentosService = TestBed.get(AprazamentosService);
    expect(service).toBeTruthy();
  });
});
