import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedDecisionComponent } from './red-decision.component';

describe('RedDecisionComponent', () => {
  let component: RedDecisionComponent;
  let fixture: ComponentFixture<RedDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedDecisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
