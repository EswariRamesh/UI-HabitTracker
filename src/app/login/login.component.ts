import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

    constructor(private http: HttpClient, private router: Router) {}  // Inject Router

  onLogin() {
    const payload = { username: this.username, password: this.password };

   this.http.post('https://habittrackerapi-ambqgtbdchh2brhc.uksouth-01.azurewebsites.net/api/auth/login', payload)
      .subscribe({
        next: (res: any) => {
          this.message = 'Login successful!';
          this.router.navigate(['/dashboard']);  // Navigate on success
        },
        error: (err) => {
          this.message = 'Login failed.';
        }
      });
  }
}
