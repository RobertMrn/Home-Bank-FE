import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogForChangingPasswordComponent } from './dialog-for-changing-password.component';

describe('DialogForChangingPasswordComponent', () => {
  let component: DialogForChangingPasswordComponent;
  let fixture: ComponentFixture<DialogForChangingPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogForChangingPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogForChangingPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
