import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitiesFormPageComponent } from './opportunities-form-page.component';

describe('OpportunitiesFormPageComponent', () => {
  let component: OpportunitiesFormPageComponent;
  let fixture: ComponentFixture<OpportunitiesFormPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpportunitiesFormPageComponent]
    });
    fixture = TestBed.createComponent(OpportunitiesFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
