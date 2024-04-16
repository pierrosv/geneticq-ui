import {Component, OnInit} from '@angular/core';
import {StatsModel} from "../../core/models/stats";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../core/services/auth.service";
import {DoctorService} from "../../core/services/doctor.service";

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  doctorId: number;
  statsData: StatsModel[];

  constructor(private router: Router,
              private translateSrv: TranslateService,
              private doctorSrv: DoctorService,
              private authSrv: AuthenticationService) { }

  ngOnInit(): void {
    this.doctorId = this.authSrv.getCurrentUserProfile.id;
    this.doctorSrv.getAllStats(this.doctorId).subscribe(x=> {
      this.statsData = x;
    });
  }
}
