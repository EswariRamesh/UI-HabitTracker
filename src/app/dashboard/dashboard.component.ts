
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Needed for *ngIf
import { Router } from '@angular/router'; // ✅ Import Router
import { WordProblemComponent } from '../word-problem/word-problem.component';
import { StoryTellingComponent } from '../story-telling/story-telling.component'; 
import { BadgeEarnedComponent } from '../badges-earned/badges-earned.component'; 
import { ProgressReportComponent } from '../progress-report/progress-report.component'; 




@Component({
  selector: 'app-dashboard',
  standalone: true, // ✅ Mark as standalone
  imports: [CommonModule, WordProblemComponent,StoryTellingComponent,BadgeEarnedComponent,ProgressReportComponent], // ✅ Makes *ngIf, *ngFor, etc. available
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userName = localStorage.getItem('userName') || 'Guest';
  underDevelopmentMessage: string | null = null;

  constructor(private router: Router) {} // ✅ Inject Router here

   // ADD THIS:
  showWordProblem = false;
  showStoryTelling = false
  showBadgesEarned = false;
  showProgressReport =false;

   openWordProblem() {
    this.showWordProblem = true;
    this.showStoryTelling = false;
    this.showBadgesEarned = false;
    this.showProgressReport =false;
  }

  openStoryTelling() {
    this.showStoryTelling = true;
    this.showWordProblem = false;
    this.showBadgesEarned = false;
    this.showProgressReport =false;
  }

  // ProgressReport() {
  //   this.showStoryTelling = false;
  //   this.showWordProblem = false;
  //   this.showBadgesEarned = false;
  //   this.showProgressReport = true;
  // }
  openProgressReport(event: Event) {
  event.preventDefault();
  this.showProgressReport = true;

  // hide others
  this.showWordProblem = false;
  this.showStoryTelling = false;
  this.showBadgesEarned = false;
}

  closeWordProblem() {
    this.showWordProblem = false;
    
  }
  goBackToDashboard() {
  this.showWordProblem = false;
  this.showStoryTelling = false;
  this.showBadgesEarned = false;
  this.showProgressReport = false;
}


  showUnderDevelopment(event: Event) {
    event.preventDefault(); // Prevent default anchor behavior (navigation)
    this.underDevelopmentMessage = 'This feature is under development!';

    // Clear message after 3 seconds
    setTimeout(() => {
      this.underDevelopmentMessage = null;
    }, 3000);
  }

  //for BadgesEarned section
  openBadgesEarned(event: Event) {
    event.preventDefault();
    this.showBadgesEarned = true;
    
    // Hide other sections as needed
    this.showWordProblem = false;
    this.showStoryTelling = false;
     this.showProgressReport = false;
    this.underDevelopmentMessage = '';
  }

  logout(event: Event) {
  event.preventDefault();

  // Remove saved user info
  localStorage.removeItem('userName');
  // If you store an auth token, also remove it
  // localStorage.removeItem('token');

  // Redirect to login page
  this.router.navigate(['/login']);
  
}


}
