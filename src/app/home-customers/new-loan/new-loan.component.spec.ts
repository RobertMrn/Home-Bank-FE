import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLoanComponent } from './new-loan.component';

describe('NewLoanComponent', () => {
  let component: NewLoanComponent;
  let fixture: ComponentFixture<NewLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
