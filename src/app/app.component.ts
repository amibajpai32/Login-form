import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule,FormsModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular17';
  
}
