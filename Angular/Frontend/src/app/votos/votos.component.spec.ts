import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotosComponent } from './votos.component';

describe('VotosComponent', () => {
  let component: VotosComponent;
  let fixture: ComponentFixture<VotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VotosComponent]
    });
    fixture = TestBed.createComponent(VotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
