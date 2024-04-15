import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/services/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {StatsModel} from "../../core/models/stats";
import {AdminService} from "../../core/services/admin.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  statsData: StatsModel[];

  constructor(private router: Router,
              private translateSrv: TranslateService,
              private adminSrv: AdminService,
              private authSrv: AuthenticationService) { }

  ngOnInit(): void {
      this.adminSrv.getAllStats().subscribe(x=> {
        this.statsData = x;
      });
  }
}
