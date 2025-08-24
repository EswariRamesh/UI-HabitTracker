export interface WordProblemAttempt {
  attemptId: number;
  userId: number;
  attemptDate: string; // or Date if you prefer, but usually string from API
  correctAnswers: number;
  totalQuestions: number;
  scorePercentage: number;
}
