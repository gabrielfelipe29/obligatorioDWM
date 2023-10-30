import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistradoComponent } from './registrado.component';

describe('RegistradoComponent', () => {
  let component: RegistradoComponent;
  let fixture: ComponentFixture<RegistradoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistradoComponent]
    });
    fixture = TestBed.createComponent(RegistradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
