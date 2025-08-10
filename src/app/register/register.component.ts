import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  email = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    const payload = {
      username: this.username,
      password: this.password,
      email: this.email
    };

    this.http.post('https://habittrackerapi-ambqgtbdchh2brhc.uksouth-01.azurewebsites.net/api/auth/register', payload)
      .subscribe({
        next: (res: any) => {
          this.message = 'Registration successful! Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.message = 'Registration failed.';
        }
      });
  }
}
