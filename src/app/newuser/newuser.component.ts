import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newuser',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './newuser.component.html',
  styleUrl: './newuser.component.css'
})
export class NewuserComponent {
  newUser: any = {};

  
   
  newuserDetailsForm!: FormGroup
   constructor(private fb:FormBuilder,private http: HttpClient, private router: Router){
   
   }

   ngOnInit(): void {
    this.newuserDetailsForm= this.fb.group({
      Username:['',Validators.required],
      Name:['',Validators.required],
      Email:['',[Validators.required,Validators.email]],
      Mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)],], 
      Gender: ['',[Validators.required, Validators.pattern(/^(Male|Female|Other)$/i)]],
      Fname:['',Validators.required],
      Address:['',Validators.required],
    })
   }

   get newuserFormControl() {
      return this.newuserDetailsForm.controls;
   }

   
  onSubmit(){
    if (this.newuserDetailsForm.valid) {
    const formData = this.newuserDetailsForm.value;
    this.http.post("https://localhost:7229/api/RegistrationAPI", formData).subscribe(
      (response) => {
        console.log("User added successfully:",response);    
        this.router.navigate(['/user-table']);
      },
      (error) =>{
        console.error("Error adding user:", error);
      }
      

    );
  }else{
    console.log("Form is invalid");
  }
}

 


}
