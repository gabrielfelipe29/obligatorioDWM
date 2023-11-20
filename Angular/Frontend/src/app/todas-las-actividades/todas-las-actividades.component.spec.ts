import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodasLasActividadesComponent } from './todas-las-actividades.component';

describe('TodasLasActividadesComponent', () => {
  let component: TodasLasActividadesComponent;
  let fixture: ComponentFixture<TodasLasActividadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodasLasActividadesComponent]
    });
    fixture = TestBed.createComponent(TodasLasActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
