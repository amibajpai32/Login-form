import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.guard';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {
 
  users: any[] = [];
  isEditing: string | null = null;
  originalUserData: any = {};
  newUser: any = {};
  showAddForm: boolean = false;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.http.get("https://localhost:7229/api/RegistrationAPI").subscribe(
      (data: any) => {
        this.users = data;
        console.log("user data loaded", this.users);
      },
      (error) => {
        console.error("Error fetching user data:", error);
      }
    );


  }
  onEdit(username: any) {

    this.isEditing = username;
    const user = this.users.find(u => u.username === username);
    this.originalUserData = { ...user };

  }

  onSave(user: any) {
    this.http.put(`https://localhost:7229/api/RegistrationAPI/${user.username}`, user).subscribe(
      (response) => {
        console.log("user updated successfully:", response);
        this.isEditing = null;
      },
      (error) => {
        console.error("Error updating", error);
      }
    );
  }

  onDelete(username: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`https://localhost:7229/api/RegistrationAPI/${username}`,{responseType: 'text'}).subscribe(
          () => {
            console.log(`User with username ${username} deleted successfully.`);
            const index = this.users.findIndex(user => user.username === username);
            if (index !== -1) {
              // Check if the deleted user is the one currently being edited
              if (this.isEditing === username) {
                this.isEditing = null; // Exit edit mode since the user is deleted
              }
              this.users.splice(index, 1); // Remove from UI immediately
            }
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          },
          (error) => {
            console.error("Error deleting user:", error);
            Swal.fire(
              'Error!',
              'There was a problem deleting the user.',
              'error'
            );
          }
        );
      }
    });
  }


  onCancel(username: string) {
    // Find the index of the user to revert
    const index = this.users.findIndex(user => user.username === username);
    if (index !== -1) {
      // Restore the original data from the stored copy
      this.users[index] = { ...this.originalUserData }; // Revert to original data
    }

    this.isEditing = null; // Exit edit mode
  }

  onLogout(): void{
    this.authService.logout();
  }




  goToAddUser() {
    this.router.navigate(['/newuser']);
  }








}
