import { Component, OnInit } from '@angular/core';
import { WordProblemService } from '../services/word-problem.service';
import { CommonModule } from '@angular/common';

interface WordProblemAttempt {
  attemptId: number;
  userId: number;
  attemptDate: string;
  correctAnswers: number;
  totalQuestions: number;
  scorePercentage: number;
}

@Component({
  selector: 'app-progress-report',
  templateUrl: './progress-report.component.html',
  styleUrls: ['./progress-report.component.css'],
  imports: [CommonModule],
})
export class ProgressReportComponent implements OnInit {
  userId: number | null = null; 
  attempts: WordProblemAttempt[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  streakCount: number = 0;  // 🔥 keeps track of current streak

  constructor(private wpService: WordProblemService) {
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? +storedUserId : null;
  }

  ngOnInit(): void {
    if (!this.userId) {
      this.errorMessage = "User not set.";
      this.loading = false;
      return;
    }

    this.wpService.getProgressReport(this.userId).subscribe({
      next: (data) => {
        this.attempts = data;
        this.calculateStreak();   // 🔥 calculate streak once data is loaded
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load progress report.';
        this.loading = false;
      }
    });
  }

  private calculateStreak() {
    // Rule: streak = number of consecutive attempts (from latest backwards) with score >= 50
    this.streakCount = 0;
    for (let i = this.attempts.length - 1; i >= 0; i--) {
      if (this.attempts[i].scorePercentage >= 20) {
        this.streakCount++;
      } else {
        break; // streak broken
      }
    }
  }

  getColor(score: number): string {
    if (score > 75) return '#4caf50';  // Green
    if (score > 50) return '#ffeb3b';  // Yellow
    if (score > 25) return '#ff9800';  // Orange
    return '#f44336';                  // Red
  }
}
