import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css',
  

})
export class LoginpageComponent {
  

  httpClient = inject(HttpClient);
  loginobj: Login;
  userData: any;
 

  constructor(private http: HttpClient, private router: Router ){
    this.loginobj = new Login();
  }

  onLogin() {
    console.log(this.loginobj);
    this.http.post("https://localhost:7229/api/Login", this.loginobj).subscribe((res: any) => {
      if (res.result) {
        Swal.fire("Login success");
        this.router.navigate(['/user-table']);  // Use SweetAlert for the alert
         }  else {
        Swal.fire(res.message);
      }
    });
  }
    navigateToregistration(){
      this.router.navigate(['/registrationpage']);
    }

  }


export class Login{
 username: string;
  Password: String;
  constructor(){
    this.username = '';
    this.Password = '';
  }
}

  





