import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StoryService {
//  private apiUrl = 'https://localhost:7028/api/stories';

  constructor(private http: HttpClient) { }

  // getRandomStory(yearGroup: number): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/stories/${yearGroup}`);
  // }
  getStories(): Observable<any[]> {
  return this.http.get<any[]>(`${environment.apiUrl}/stories`);
}


  submitAttempt(attempt: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/stories/attempt`, attempt);
  }
}



