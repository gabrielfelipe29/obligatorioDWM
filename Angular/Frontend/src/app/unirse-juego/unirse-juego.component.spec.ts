import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnirseJuegoComponent } from './unirse-juego.component';

describe('UnirseJuegoComponent', () => {
  let component: UnirseJuegoComponent;
  let fixture: ComponentFixture<UnirseJuegoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnirseJuegoComponent]
    });
    fixture = TestBed.createComponent(UnirseJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
