import { Component, OnInit } from '@angular/core';
import { WordProblemService } from '../services/word-problem.service';
import { CommonModule } from '@angular/common'; // ✅ Needed for *ngIf
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-word-problem',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Makes *ngIf, *ngFor, etc. available
  templateUrl: './word-problem.component.html',
  styleUrls: ['./word-problem.component.css']
})
export class WordProblemComponent implements OnInit {

  problems: any[] = [];
  currentIndex = 0;
  score = 0;
  answer = '';

  constructor(private wpService: WordProblemService) {}

  ngOnInit() {
    this.wpService.getWordProblems().subscribe(data => {
      this.problems = data;
    });
  }

  submitAnswer() {
    const currentProblem = this.problems[this.currentIndex];
    if (this.answer.trim() === currentProblem.answer.toString()) {
      this.score++;
    }
    this.answer = '';
    this.currentIndex++;

    if (this.currentIndex >= this.problems.length) {
      const scoreData = { userId: 1, score: this.score };
      this.wpService.submitScore(scoreData).subscribe(() => {
        alert(`Quiz finished! Your score is ${this.score}`);
      });
    }
  }
}
