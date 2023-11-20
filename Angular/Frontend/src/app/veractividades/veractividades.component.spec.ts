import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeractividadesComponent } from './veractividades.component';

describe('VeractividadesComponent', () => {
  let component: VeractividadesComponent;
  let fixture: ComponentFixture<VeractividadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeractividadesComponent]
    });
    fixture = TestBed.createComponent(VeractividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
