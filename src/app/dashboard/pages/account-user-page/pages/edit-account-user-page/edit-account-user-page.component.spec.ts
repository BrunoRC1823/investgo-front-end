import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountUserPageComponent } from './edit-account-user-page.component';

describe('EditAccountUserPageComponent', () => {
  let component: EditAccountUserPageComponent;
  let fixture: ComponentFixture<EditAccountUserPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAccountUserPageComponent]
    });
    fixture = TestBed.createComponent(EditAccountUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
