import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowDecisionComponent } from './yellow-decision.component';

describe('YellowDecisionComponent', () => {
  let component: YellowDecisionComponent;
  let fixture: ComponentFixture<YellowDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YellowDecisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YellowDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
