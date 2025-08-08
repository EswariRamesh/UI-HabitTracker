import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router'; // Added RouterModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule // <-- Add this so router.navigate works properly in standalone
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const payload = { username: this.username, password: this.password };

    this.http.post('https://habittrackerapi-ambqgtbdchh2brhc.uksouth-01.azurewebsites.net/api/auth/login', payload)
      .subscribe({
        next: (res: any) => {
          console.log('Login API response:', res); // Debug log
          this.message = 'Login successful!';
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login error:', err); // Debug log
          this.message = 'Login failed.';
        }
      });
  }
}
