import { Component, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global.constants';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ISignUpData, UserService } from 'src/app/services/user/user.service';
import { ErrorConfig } from '../field-error-display/field-error-display.component';
import { ToastMessageComponent, ToastType } from '../toast-message/toast-message.component';

type UserRole = 'admin' | 'user';
export interface IUser {
  _id?: string;
  fullName?: string;
  email: string;
  password?: string;
  role?: UserRole;
  accessToken?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userInfo: IUser | null = null;
  selectedTabIndex: number = 0;
  emailErrors: ErrorConfig[] = [
    {
      name: 'required',
      message: 'Email is required.'
    },
    {
      name: 'invalidEmail',
      message: 'Invalid format email.'
    }
  ];
  passwordErrors: ErrorConfig[] = [
    {
      name: 'required',
      message: 'Password is required.'
    },
    {
      name: 'invalidPassword',
      message: 'Invalid format password.'
    }
  ];
  confirmPasswordErrors: ErrorConfig[] = [
    {
      name: 'required',
      message: 'Confirm password is required.'
    },
    {
      name: 'invalidConfirmPassword',
      message: 'Confirm password must match password .'
    }
  ];

  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, this.emailValidator()]),
    password: new FormControl('', [Validators.required])
  });

  signUpForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, this.emailValidator()]),
    password: new FormControl('', [Validators.required, this.passwordValidator()]),
    confirmPassword: new FormControl('', [Validators.required, this.confirmPasswordValidator()])
  });

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openSnackBar(duration: number = 3000, message: string, type: ToastType) {
    this._snackBar.openFromComponent(ToastMessageComponent, {
      duration,
      panelClass: [`${type}-snackbar`],
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: {
        message
      }
    });
  }

  signIn(user: IUser): void {
    this.userService.signIn(user).subscribe((response) => {
      if (response.message === 'Success' && response.data.accessToken && response.data.role) {
        this.authService.setCookie('token', response.data.accessToken, GlobalConstants.cookieExpiryDays);
        this.authService.setCookie('role', response.data.role, GlobalConstants.cookieExpiryDays);
        this.router.navigate(['/']);
      }
    },
    (error) => {
      const message = error.error.error ? error.error.error : 'An error has occurred!';
      this.openSnackBar(1500, message, 'error');
    });
  }

  signUp(signUpData: ISignUpData, sigUpFormDirective: FormGroupDirective): void {
    this.userService.signUp(signUpData).subscribe((response) => {
      if (response.message === 'Success') {
        this.selectedTabIndex = 0;
        this.openSnackBar(1500, 'Sign up success!', 'success');
        this.signUpForm.reset();
        sigUpFormDirective.resetForm();
      }
    },
    (error) => {
      const message = error.error.error ? error.error.error : 'An error has occurred!';
      this.openSnackBar(1500, message, 'error');
    });
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === '') {
        return {
          required: true
        };
      }
      const validEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(control.value);
      return !validEmail ? {
        invalidEmail: true
      } : null;
    }
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === '') {
        return {
          required: true
        };
      }
      const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(control.value);
      return !validPassword ? {
        invalidPassword: true
      } : null;
    }
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === '') {
        return {
          required: true
        };
      }
      const validConfirmPassword = this.signUpForm.controls['password'].value === control.value;
      return !validConfirmPassword ? {
        invalidConfirmPassword: true
      } : null;
    }
  }
}
