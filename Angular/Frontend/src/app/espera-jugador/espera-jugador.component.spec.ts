import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsperaJugadorComponent } from './espera-jugador.component';

describe('EsperaJugadorComponent', () => {
  let component: EsperaJugadorComponent;
  let fixture: ComponentFixture<EsperaJugadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsperaJugadorComponent]
    });
    fixture = TestBed.createComponent(EsperaJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
