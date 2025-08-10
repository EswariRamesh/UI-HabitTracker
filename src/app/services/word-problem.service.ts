import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WordProblemService {
  constructor(private http: HttpClient) {}

  getWordProblems(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/wordproblem`);
  }

  submitScore(scoreData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/scores`, scoreData);
  }

  getScoreReport(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/scores/report`);
  }
}
