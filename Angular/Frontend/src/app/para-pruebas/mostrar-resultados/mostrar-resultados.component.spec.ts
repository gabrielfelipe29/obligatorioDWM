import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarResultadosComponent } from './mostrar-resultados.component';

describe('MostrarResultadosComponent', () => {
  let component: MostrarResultadosComponent;
  let fixture: ComponentFixture<MostrarResultadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarResultadosComponent]
    });
    fixture = TestBed.createComponent(MostrarResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
