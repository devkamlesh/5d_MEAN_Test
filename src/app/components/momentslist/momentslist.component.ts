import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { APIEndPoints } from 'src/app/config/constant';
import { MomentService } from 'src/app/services/moment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-momentslist',
  templateUrl: './momentslist.component.html',
  styleUrls: ['./momentslist.component.scss']
})
export class MomentslistComponent implements OnInit {
  displayedColumns: string[] = ['id', 'image', 'title', 'tags', 'comment', 'action'];
  baseImgPath = APIEndPoints.API_BASE_URL.split('/api').join('');

  constructor(
    private momentService: MomentService,
    private authService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private ngxSpinner: NgxSpinnerService
  ) { }
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  dataSource: any;
  ngOnInit(): void {
    this.getMoment();
  }

  getMoment() {
    this.ngxSpinner.show();
    this.momentService.getMomentService().subscribe(async data => {
      const resData = await this.authService.requestResponse(data);
      if (resData && resData.data) {
        this.dataSource = new MatTableDataSource(resData.data);
        this.ngxSpinner.hide();
      }
    }, err => {
      console.log(err);
      this.ngxSpinner.hide();
    })
  }

  editMoment(_id) {
    this.router.navigate(['add'], { queryParams: { _id } })
  }

  deleteMoment(moment) {
    this.momentService.deleteMomentService(moment._id).subscribe(async data => {
      const resData = await this.authService.requestResponse(data);
      if (resData && resData.data) {
        this.toastr.info("Moment deleted successfully!!!");
        this.deleteOldImages(moment.imagePath)
        this.getMoment();
      }
    }, err => {
      console.log(err);
    })
  }

  deleteOldImages(image) {
    const data = { images: image }
    this.momentService.deleteOldImageService(data).subscribe(async d => {
      const resData = await this.authService.requestResponse(d);
      if (resData) {
        console.log("image deleted");
      }
    }, err => {
      console.log(err);
    })
  }
}
