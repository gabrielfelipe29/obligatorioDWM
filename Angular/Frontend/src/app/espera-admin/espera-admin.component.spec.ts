import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsperaAdminComponent } from './espera-admin.component';

describe('EsperaAdminComponent', () => {
  let component: EsperaAdminComponent;
  let fixture: ComponentFixture<EsperaAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsperaAdminComponent]
    });
    fixture = TestBed.createComponent(EsperaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
