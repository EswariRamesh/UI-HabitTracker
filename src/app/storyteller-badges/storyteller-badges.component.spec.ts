import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorytellerBadgesComponent } from './storyteller-badges.component';

describe('StorytellerBadgesComponent', () => {
  let component: StorytellerBadgesComponent;
  let fixture: ComponentFixture<StorytellerBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorytellerBadgesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorytellerBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
