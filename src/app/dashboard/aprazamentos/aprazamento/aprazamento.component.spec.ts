import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprazamentoComponent } from './aprazamento.component';

describe('AprazamentoComponent', () => {
  let component: AprazamentoComponent;
  let fixture: ComponentFixture<AprazamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprazamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprazamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
