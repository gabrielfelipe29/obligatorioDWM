import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnirsePropuestaComponent } from './unirse-propuesta.component';

describe('UnirsePropuestaComponent', () => {
  let component: UnirsePropuestaComponent;
  let fixture: ComponentFixture<UnirsePropuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnirsePropuestaComponent]
    });
    fixture = TestBed.createComponent(UnirsePropuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
