import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../core/services/auth.service";

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {
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
