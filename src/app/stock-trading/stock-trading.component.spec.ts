import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTradingComponent } from './stock-trading.component';

describe('StockTradingComponent', () => {
  let component: StockTradingComponent;
  let fixture: ComponentFixture<StockTradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockTradingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockTradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
