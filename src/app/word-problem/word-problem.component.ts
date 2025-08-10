import { Component, OnInit } from '@angular/core';
import { WordProblemService } from '../services/word-problem.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

interface WordProblem {
  question: string;
  answer: string | number;
}

@Component({
  selector: 'app-word-problem',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './word-problem.component.html',
  styleUrls: ['./word-problem.component.css']
})
export class WordProblemComponent implements OnInit {

  problems: WordProblem[] = [];
  currentIndex = 0;
  score = 0;
  answer: string = '';

  constructor(private wpService: WordProblemService) {}

loading = true;  // new flag to track loading

  ngOnInit() {
    this.wpService.getWordProblems().subscribe((data: WordProblem[]) => {
      this.problems = data;
      this.loading = false;
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
        console.log(`Quiz finished! Your score is ${this.score}`);
        // Finished template will show automatically
      });
    }
  }
}
