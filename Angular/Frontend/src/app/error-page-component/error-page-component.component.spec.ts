import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPageComponentComponent } from './error-page-component.component';

describe('ErrorPageComponentComponent', () => {
  let component: ErrorPageComponentComponent;
  let fixture: ComponentFixture<ErrorPageComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorPageComponentComponent]
    });
    fixture = TestBed.createComponent(ErrorPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
