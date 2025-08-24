import { Component, OnInit } from '@angular/core';
import { WordProblemService } from '../services/word-problem.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  totQuestions = 0;
  answer: string = '';
  loading = true;
  showFeedback = false;
  isCorrect = false;
  username = localStorage.getItem('userName') || 'Guest'; // Set this dynamically
  userId: number | null = null; // initialized as null

  constructor(private wpService: WordProblemService) {}

  ngOnInit() {
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? +storedUserId : null;
    this.wpService.getWordProblems().subscribe((data: WordProblem[]) => {
      this.problems = data;
      this.loading = false;
    });
  }

  submitAnswer() {
    const currentProblem = this.problems[this.currentIndex];
    this.isCorrect = (this.answer.trim() === currentProblem.answer.toString());
    if (this.isCorrect) this.score++;
    this.showFeedback = true;
  }

  nextQuestion() {
    this.answer = '';
    this.showFeedback = false;
    this.currentIndex++;
    if (this.currentIndex >= this.problems.length) {
      const scoreData = { userId: this.userId , correctAnswers: this.score, totalQuestions : this.problems.length };
      //this.wpService.submitScore(scoreData).subscribe(() => {});
      this.wpService.submitWordProblemAttempt(scoreData).subscribe(
        response => {
          console.log('Attempt submitted successfully', response);
        },
        error => {
          console.error('Error submitting attempt', error);
        }
      );
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.answer = '';
      this.showFeedback = false;
    }
  }
}
