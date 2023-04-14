import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionModalComponentForBuying } from './transaction-modal-component-for-buying.component';

describe('TransactionModalComponent', () => {
  let component: TransactionModalComponentForBuying;
  let fixture: ComponentFixture<TransactionModalComponentForBuying>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionModalComponentForBuying ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionModalComponentForBuying);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
