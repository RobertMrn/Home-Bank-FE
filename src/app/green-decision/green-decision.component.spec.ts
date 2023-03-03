import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenDecisionComponent } from './green-decision.component';

describe('GreenDecisionComponent', () => {
  let component: GreenDecisionComponent;
  let fixture: ComponentFixture<GreenDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenDecisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
