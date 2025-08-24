import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryTellingComponent } from './story-telling.component';

describe('StoyTellingComponent', () => {
  let component: StoryTellingComponent;
  let fixture: ComponentFixture<StoryTellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryTellingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryTellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
