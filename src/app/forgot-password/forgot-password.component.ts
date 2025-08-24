import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  imports: [
    CommonModule,       // ✅ Needed for *ngIf
    FormsModule,        // ✅ Needed for [(ngModel)]
    HttpClientModule    // ✅ Needed for HttpClient
  ]
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';

   constructor(private http: HttpClient, private router: Router) {}

  submit() {
    if (!this.email) {
      this.message = 'Please enter your email.';
      return;
    }

    this.http.post(`${environment.apiUrl}/auth/forgot-password`, { email: this.email }).subscribe({
      next: () => {
        this.message = '✅ Reset link has been sent.';
        // After 3 seconds, automatically navigate to login page
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: () => {
        this.message = '❌ Error sending reset link.';
      }
    });
  }
}

