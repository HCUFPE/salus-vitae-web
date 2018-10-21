import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesAprazamentoComponent } from './datalhes-aprazamento.component';

describe('DetalhesAprazamentoComponent', () => {
  let component: DetalhesAprazamentoComponent;
  let fixture: ComponentFixture<DetalhesAprazamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesAprazamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesAprazamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
