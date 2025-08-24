import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule   // ✅ needed for HttpClient
  ],
  standalone: true
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.token = params['token'] || '';
    });
  }

  passwordsMatch(): boolean {
    return this.newPassword === this.confirmPassword;
  }

  submit() {
    if (!this.passwordsMatch()) {
      this.message = 'Passwords do not match.';
      return;
    }

    const body = {
      email: this.email,
      token: this.token,
      newPassword: this.newPassword
    };

    this.http.post(`${environment.apiUrl}/auth/reset-password`, body).subscribe({
      next: () => {
        this.message = 'Password reset successful.';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.message = 'Failed to reset password.';
        console.error('Reset password error:', err);
      }
    });
  }
}
