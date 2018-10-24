import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProntuariosComponent } from './listar-prontuarios.component';

describe('ListarProntuariosComponent', () => {
  let component: ListarProntuariosComponent;
  let fixture: ComponentFixture<ListarProntuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarProntuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProntuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
