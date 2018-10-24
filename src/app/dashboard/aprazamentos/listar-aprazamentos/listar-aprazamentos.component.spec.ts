import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAprazamentosComponent } from './listar-aprazamentos.component';

describe('ListarAprazamentosComponent', () => {
  let component: ListarAprazamentosComponent;
  let fixture: ComponentFixture<ListarAprazamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarAprazamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAprazamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
