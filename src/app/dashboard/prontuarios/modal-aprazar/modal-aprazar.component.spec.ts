import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAprazarComponent } from './modal-aprazar.component';

describe('ModalAprazarComponent', () => {
  let component: ModalAprazarComponent;
  let fixture: ComponentFixture<ModalAprazarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAprazarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAprazarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
