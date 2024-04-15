import { Component } from '@angular/core';
import {AuthenticationService} from "../core/services/auth.service";

@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.css']
})
export class MainProfileComponent {
  isAdmin = true;
  isDoctor = false;

  constructor(private authService: AuthenticationService) {

  }


  ngOnInit(): void {
    console.log(this.authService.getCurrentUserProfile.roleLabel);
    this.isAdmin = this.authService.getCurrentUserProfile.role == "Admin";
    this.isDoctor = !this.isAdmin;
  }
}
