import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarAprazamentoComponent } from './cadastrar-aprazamento.component';

describe('CadastrarAprazamentoComponent', () => {
  let component: CadastrarAprazamentoComponent;
  let fixture: ComponentFixture<CadastrarAprazamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarAprazamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarAprazamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
