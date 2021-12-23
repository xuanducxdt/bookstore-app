import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

type UserRole = 'admin' | 'user';
export interface IUser {
  _id?: string;
  fullName?: string;
  email: string;
  password: string;
  role?: UserRole
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userInfo: IUser | null = null;

  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  signUpForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  signIn(user: IUser): void {
    console.log({ user });
    this.userService.signIn(user).subscribe((response) => {
      this.userInfo = response.data;
    });
  }

  signUp(user: IUser): void {
    console.log({ user });
    this.userService.signIn(user).subscribe((response) => {
      console.log({ response });
    });
  }
}
