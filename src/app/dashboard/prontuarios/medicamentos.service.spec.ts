import { TestBed } from '@angular/core/testing';

import { MedicamentosService } from './medicamentos.service';

describe('MedicamentosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicamentosService = TestBed.get(MedicamentosService);
    expect(service).toBeTruthy();
  });
});
