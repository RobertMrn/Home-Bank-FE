import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCustomersComponent } from './home-customers.component';

describe('HomeCustomersComponent', () => {
  let component: HomeCustomersComponent;
  let fixture: ComponentFixture<HomeCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
