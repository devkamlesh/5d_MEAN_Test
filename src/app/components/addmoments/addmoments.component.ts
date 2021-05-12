import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MomentService } from 'src/app/services/moment.service';
import { UserService } from 'src/app/services/user.service';
import { APIEndPoints } from 'src/app/config/constant';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addmoments',
  templateUrl: './addmoments.component.html',
  styleUrls: ['./addmoments.component.scss']
})
export class AddmomentsComponent implements OnInit {
  momentImage: any;
  momentForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    tags: new FormControl('', [Validators.required]),
    imagePath: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
  });
  selectMomentImg: any;
  baseImagePath = APIEndPoints.API_BASE_URL.split('/api').join('');
  momentId: any;
  constructor(
    private toastr: ToastrService,
    private snackbar: MatSnackBar,
    private momentService: MomentService,
    private authService: UserService,
    private router: Router,
    private routes: ActivatedRoute
  ) { }

  get title() { return this.momentForm.get('title') }
  get tags() { return this.momentForm.get('tags') }
  get imagePath() { return this.momentForm.get('imagePath') }
  get comment() { return this.momentForm.get('comment') }

  ngOnInit(): void {
    this.routes.queryParams.subscribe(d => {
      if (d && d._id) {
        this.momentId = d._id;
        this.getMomentById()
      }
    }, err => {
      console.log(err);
    })
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsArray = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.tagsArray.push(value.trim());
      this.tags.patchValue(this.tagsArray)
    }
    if (input) {
      input.value = '';
    }
  }

  remove(tag): void {
    const index = this.tagsArray.indexOf(tag);
    if (index >= 0) {
      this.tagsArray.splice(index, 1);
      this.tags.patchValue(this.tagsArray)
    }
  }


  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      if (event.target.files[0].size > 2000000) {
        this.toastr.error("Please enter image less than 2MB", "Image size overload");
      } else {
        if (event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/gif') {
          this.momentImage = event.target.files[0];
        } else {
          this.toastr.error("Please select image only", "Type Mismatched")
        }
      }
    }
  }

  onUpload() {
    if (this.momentImage) {
      if (this.selectMomentImg) {
        this.deleteOldImages(this.selectMomentImg)
      }
      const formData = new FormData();
      formData.append('images', this.momentImage)
      this.uploadServiceMethod(formData)
    }
  }

  uploadServiceMethod(formData) {
    this.momentService.uploadImageService(formData).subscribe(async d => {
      const resData = await this.authService.requestResponse(d);
      if (resData && resData.data) {
        this.selectMomentImg = resData.data.path;
        this.imagePath.patchValue(this.selectMomentImg);
        this.toastr.success("image uploaded successfully.")
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
        this.selectMomentImg = ''
      }
    }, err => {
      console.log(err);
    })
  }


  moment() {
    if (this.momentForm.valid) {
      this.momentService.addMomentService(this.momentForm.value).subscribe((data: any) => {
        if (data && data.data) {
          this.momentForm.reset();
          this.selectMomentImg = '';
          this.toastr.success("Moment added successfully!!!");
          this.router.navigate(['']);
        }
      }, err => {
        console.log(err);
      })
    } else {
      this.snackbar.open("Please enter all details to proceed", 'close', { duration: 3000 })
    }
  }

  getMomentById() {
    this.momentService.getMomentByIdService(this.momentId).subscribe(async data => {
      const resData = await this.authService.requestResponse(data);
      if (resData && resData.data) {
        let moment = resData.data[0];
        this.title.patchValue(moment.title);
        this.tags.patchValue(moment.tags);
        this.tagsArray = moment.tags;
        this.selectMomentImg = moment.imagePath;
        this.imagePath.patchValue(moment.imagePath);
        this.comment.patchValue(moment.comment);
      }
    }, err => {
      console.log(err);
    })
  }

  editMoment() {
    if (this.momentForm.valid) {
      this.momentService.updateMomentService(this.momentId, this.momentForm.value).subscribe(async data => {
        const resData = await this.authService.requestResponse(data);
        if (resData && resData.data) {
          this.momentForm.reset();
          this.router.navigate(['']);
          this.toastr.success("Moment updated successfully");
        }
      }, err => {
        console.log(err);
      })
    } else {
      this.snackbar.open("Please enter all details to proceed", 'close', { duration: 3000 });
    }
  }
}
