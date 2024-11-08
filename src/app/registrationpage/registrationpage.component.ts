import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrationpage',
  standalone: true,
  imports: [DashboardComponent,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './registrationpage.component.html',
  styleUrl: './registrationpage.component.css'
})
export class RegistrationpageComponent implements OnInit  {

  registrationDetailsForm!: FormGroup
   constructor(private fb:FormBuilder){
   
   }

   ngOnInit(): void {
    this.registrationDetailsForm= this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phoneNo:['',[Validators.required,Validators.pattern('')]],
      gender: ['',[Validators.required, Validators.pattern(/^(Male|Female|Other)$/i)]]
    })
   }

   get registerFormControl() {
      return this.registrationDetailsForm.controls;
   }

   submit(){

   }
  
}
