import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    contact: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")])
  });

  get first_name() { return this.signupForm.get("first_name") }
  get last_name() { return this.signupForm.get("last_name") }
  get contact() { return this.signupForm.get("contact") }
  get email() { return this.signupForm.get("email") }
  get city() { return this.signupForm.get("city") }
  get password() { return this.signupForm.get("password") }

  constructor(
    private _snackbar: MatSnackBar,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signup() {
    if (this.signupForm.valid) {
      this.userService.registerService(this.signupForm.value).subscribe((data: any) => {
        if (data && data.data) {
          this.signupForm.reset();
          this.toastr.success("Registered successfully!!!");
          this.router.navigate(['signin']);
        } else if (data && data.message) {
          this._snackbar.open(data.message, 'close', { duration: 3000 })
        }
      }, err => {
        console.log(err);
      })
    } else {
      this._snackbar.open("Please enter all details required to register.", 'close', { duration: 3000 })
    }
  }
}
