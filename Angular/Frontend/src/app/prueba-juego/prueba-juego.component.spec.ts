import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaJuegoComponent } from './prueba-juego.component';

describe('PruebaJuegoComponent', () => {
  let component: PruebaJuegoComponent;
  let fixture: ComponentFixture<PruebaJuegoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PruebaJuegoComponent]
    });
    fixture = TestBed.createComponent(PruebaJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
