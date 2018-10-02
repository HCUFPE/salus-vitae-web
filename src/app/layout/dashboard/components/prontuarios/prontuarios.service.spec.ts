import { TestBed } from '@angular/core/testing';

import { ProntuariosService } from './prontuarios.service';

describe('ProntuariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProntuariosService = TestBed.get(ProntuariosService);
    expect(service).toBeTruthy();
  });
});
