import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    private authService: UserService,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.spinner.show();
    this.authService.getUser().subscribe(async data => {
      const resData = await this.authService.requestResponse(data);
      if (resData) {
        this.user = resData;
        this.spinner.hide();
      }
    },err=>{
      this.spinner.hide();
    })
  }
}
