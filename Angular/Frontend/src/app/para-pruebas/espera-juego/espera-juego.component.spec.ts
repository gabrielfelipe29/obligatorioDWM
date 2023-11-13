import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsperaJuegoComponent } from './espera-juego.component';

describe('EsperaJuegoComponent', () => {
  let component: EsperaJuegoComponent;
  let fixture: ComponentFixture<EsperaJuegoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsperaJuegoComponent]
    });
    fixture = TestBed.createComponent(EsperaJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
