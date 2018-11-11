import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistoricoComponent } from './modal-historico.component';

describe('ModalHistoricoComponent', () => {
  let component: ModalHistoricoComponent;
  let fixture: ComponentFixture<ModalHistoricoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHistoricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
