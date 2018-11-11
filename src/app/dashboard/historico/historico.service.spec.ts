import { TestBed } from '@angular/core/testing';

import { HistoricoService } from './historico.service';

describe('HistoricoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistoricoService = TestBed.get(HistoricoService);
    expect(service).toBeTruthy();
  });
});
