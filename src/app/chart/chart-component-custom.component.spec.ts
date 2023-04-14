import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponentCustom } from './chart-component-custom.component';

describe('ChartComponent', () => {
  let component: ChartComponentCustom;
  let fixture: ComponentFixture<ChartComponentCustom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartComponentCustom ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartComponentCustom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
