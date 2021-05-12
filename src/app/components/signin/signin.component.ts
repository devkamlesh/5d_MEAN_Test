import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required])
  })
  constructor(
    private snackbar: MatSnackBar,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  get email() { return this.signinForm.get("email") }
  get password() { return this.signinForm.get("password") }

  ngOnInit(): void {
  }
  signin() {
    if (this.signinForm.valid) {
      this.userService.loginService(this.signinForm.value).subscribe((data: any) => {
        if (data && data.message) {
          this.snackbar.open(data.message, 'close', { duration: 3000 })
        } else if (data && data.token) {
          this.userService.setToken(data);
          this.toastr.success("Login successfully!!!");
          this.router.navigate(['']);
        }
      }, err => {
        console.log(err)
      })
    } else {
      this.snackbar.open("Please enter credentials to login", "close", { duration: 3000 })
    }
  }
}
