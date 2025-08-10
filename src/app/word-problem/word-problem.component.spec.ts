import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordProblemComponent } from './word-problem.component';

describe('WordProblemComponent', () => {
  let component: WordProblemComponent;
  let fixture: ComponentFixture<WordProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordProblemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
