import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProntuariosComponent } from './prontuarios.component';

describe('ProntuariosComponent', () => {
  let component: ProntuariosComponent;
  let fixture: ComponentFixture<ProntuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProntuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProntuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
