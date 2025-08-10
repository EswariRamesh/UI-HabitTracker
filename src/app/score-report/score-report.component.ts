import { Component, OnInit } from '@angular/core';
import { WordProblemService } from '../services/word-problem.service';

@Component({
  selector: 'app-score-report',
  templateUrl: './score-report.component.html',
  styleUrls: ['./score-report.component.css']
})
export class ScoreReportComponent implements OnInit {
  scores: any[] = [];

  constructor(private wpService: WordProblemService) {}

  ngOnInit() {
    this.wpService.getScoreReport().subscribe(data => {
      this.scores = data;
    });
  }
}
