import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Badge {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  //private baseUrl = '/api/stories';

  constructor(private http: HttpClient) {}

  getStoryBadgesForUser(userId: number): Observable<Badge[]> {
    return this.http.get<Badge[]>(`${environment.apiUrl}/stories/storytellingbadges/${userId}`);

  }
}
