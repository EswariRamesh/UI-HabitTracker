import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeEarnedComponent } from './badges-earned.component';

describe('BadgesEarnedComponent', () => {
  let component: BadgeEarnedComponent;
  let fixture: ComponentFixture<BadgeEarnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeEarnedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgeEarnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
