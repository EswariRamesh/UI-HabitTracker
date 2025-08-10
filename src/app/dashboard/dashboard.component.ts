// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent {
//   userName = 'Jaizeka'; // Later, bind this from login API
// }
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Needed for *ngIf
import { Router } from '@angular/router'; // ✅ Import Router
import { WordProblemComponent } from '../word-problem/word-problem.component';

@Component({
  selector: 'app-dashboard',
  standalone: true, // ✅ Mark as standalone
  imports: [CommonModule, WordProblemComponent], // ✅ Makes *ngIf, *ngFor, etc. available
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userName = localStorage.getItem('userName') || 'Guest';
  underDevelopmentMessage: string | null = null;

  constructor(private router: Router) {} // ✅ Inject Router here

   // ADD THIS:
  showWordProblem = false;

   openWordProblem() {
    this.showWordProblem = true;
  }

  closeWordProblem() {
    this.showWordProblem = false;
  }

  showUnderDevelopment(event: Event) {
    event.preventDefault(); // Prevent default anchor behavior (navigation)
    this.underDevelopmentMessage = 'This feature is under development!';

    // Clear message after 3 seconds
    setTimeout(() => {
      this.underDevelopmentMessage = null;
    }, 3000);
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
