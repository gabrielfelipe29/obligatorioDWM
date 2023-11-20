import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarPseudonimoComponent } from './ingresar-pseudonimo.component';

describe('IngresarPseudonimoComponent', () => {
  let component: IngresarPseudonimoComponent;
  let fixture: ComponentFixture<IngresarPseudonimoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresarPseudonimoComponent]
    });
    fixture = TestBed.createComponent(IngresarPseudonimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
