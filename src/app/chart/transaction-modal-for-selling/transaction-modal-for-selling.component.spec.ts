import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionModalForSellingComponent } from './transaction-modal-for-selling.component';

describe('TransactionModalForSellingComponent', () => {
  let component: TransactionModalForSellingComponent;
  let fixture: ComponentFixture<TransactionModalForSellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionModalForSellingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionModalForSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
