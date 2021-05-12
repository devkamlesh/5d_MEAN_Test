import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLogin: any;
  sideMenu = [
    { icon: "account_circle", title: "Profile", route: "/profile" },
    {
      icon: "calendar_today", title: "Moments", route: "/", children: [
        { icon: "format_list_numbered", title: "Moment List", route: "/" },
        { icon: "add", title: "Add new moment", route: "/add" },
      ]
    },
  ]
  user: any;
  constructor(
    private authService: UserService
  ) { }

  ngOnInit(): void {
    this.authService.isLogin.subscribe(d => {
      this.isLogin = d
      this.getUser();
    }, err => {
      console.log(err);
    });
  }

  getUser() {
    this.authService.getUser().subscribe(async data => {
      const resData = await this.authService.requestResponse(data);
      if (resData) {
        this.user = resData
      }
    }, err => {
      console.log(err);
    })
  }

  logout() {
    this.authService.logOutService();
  }
}
