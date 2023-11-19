import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporizadorComponent } from './temporizador.component';

describe('TemporizadorComponent', () => {
  let component: TemporizadorComponent;
  let fixture: ComponentFixture<TemporizadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemporizadorComponent]
    });
    fixture = TestBed.createComponent(TemporizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
