import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogForNewUserComponent } from './dialog-for-new-user.component';

describe('DialogForNewUserComponent', () => {
  let component: DialogForNewUserComponent;
  let fixture: ComponentFixture<DialogForNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogForNewUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogForNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
