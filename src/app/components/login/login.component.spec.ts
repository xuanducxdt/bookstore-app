import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user/user.service';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import {
  findEl,
  expectText,
  click,
  makeClickEvent,
  setFieldValue
} from '../../spec-helpers/element.spec-helper';
import { confirmPassword, email, fullName, password, signUpData } from 'src/app/spec-helpers/signup-data.spec-helper';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: jasmine.SpyObj<UserService>;

  // const setup = async (
  //   userServiceReturnValues?: jasmine.SpyObjMethodNames<UserService>,
  // ) => {
  //   userService = jasmine.createSpyObj<UserService>('UserService', {
  //     signIn: of({
  //       message: 'Success',
  //       data: {
  //         _id: '61c92183ff0ef6cb662ee177',
  //         fullName: 'Xuân Đức',
  //         email: 'xdt@gmail.com',
  //         role: 'admin',
  //         accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxYzkyMTgzZmYwZWY2Y2I2NjJlZTE3NyIsImZ1bGxOYW1lIjoiWHXDom4gxJDhu6ljIiwiZW1haWwiOiJ4ZHRAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY0MDc1ODk2OCwiZXhwIjoxNjQzNzU4OTY4fQ.BHAlwCfW_LyGIaNjeruwBPTGJ-Je6uKfDOUPF4cLQ_o'
  //       }
  //     }),
  //     signUp: of({
  //       message: 'Success'
  //     }),
  //     ...userServiceReturnValues
  //   });
  // };

  const fillForm = () => {
    setFieldValue(fixture, 'sign-up-fullName', fullName);
    setFieldValue(fixture, 'sign-up-email', email);
    setFieldValue(fixture, 'sign-up-password', password);
    setFieldValue(fixture, 'sign-up-confirmPassword', confirmPassword);
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        RouterModule.forRoot([]),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule
      ],
      providers: [
        {
          provide: JWT_OPTIONS, useValue: JWT_OPTIONS
        },
        JwtHelperService,
        {
          provide: UserService, useValue: userService
        }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Registration Form', () => {
    it('should disable "Sign Up" button when form is invalid', async () => {
      const { signUpForm } = component;

      expect(signUpForm.invalid).toEqual(true);
      expect(findEl(fixture, 'sign-up-button').properties?.['disabled']).toBe(true);
    });

    it('should enable "Sign Up" button when form is valid', async () => {
      fillForm();
      fixture.detectChanges();
      const { signUpForm } = component;

      expect(signUpForm.valid).toEqual(true);
      expect(findEl(fixture, 'sign-up-button').properties?.['disabled']).toBe(false);
    });

    describe('Full Name Field Input', () => {
      let fullName: AbstractControl;

      beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fullName = component.signUpForm.controls['fullName'];
        fixture.detectChanges();
      });

      it('should be required when empty', () => {
        expect(fullName.errors?.['required']).toBe(true);
      });

      it('should be valid when the field has been entered', () => {
        setFieldValue(fixture, 'sign-up-fullName', 'Lisa Nguyễn');
        expect(fullName.valid).toBe(true);
      });
    });

    describe('Email Field Input', () => {
      let email: AbstractControl;

      beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        email = component.signUpForm.controls['email'];
        fixture.detectChanges();
      });

      it('should be required when empty', () => {
        expect(email.errors?.['required']).toBe(true);
      });

      it('should be invalid when entered wrong email format', () => {
        setFieldValue(fixture, 'sign-up-email', 'Lisa Nguyễn');
        console.log('email', email)
        expect(email.errors?.['invalidEmail']).toBe(true);
      });

      it('should be valid when entered right email format', () => {
        setFieldValue(fixture, 'sign-up-email', 'lisa@bookstore.com');
        expect(email.valid).toBe(true);
      });
    });

    describe('Password Field Input', () => {
      let password: AbstractControl;

      beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        password = component.signUpForm.controls['password'];
        fixture.detectChanges();
      });

      it('should be required when empty', () => {
        expect(password.errors?.['required']).toBe(true);
      });

      it('should be invalid when entered wrong password format', () => {
        setFieldValue(fixture, 'sign-up-password', '123456');
        expect(password.errors?.['invalidPassword']).toBe(true);
      });

      it('should be valid when entered right password format', () => {
        setFieldValue(fixture, 'sign-up-password', '@Aa1234');
        expect(password.valid).toBe(true);
      });
    });

    describe('Confirm Password Field Input', () => {
      let confirmPassword: AbstractControl;

      beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        confirmPassword = component.signUpForm.controls['confirmPassword'];
        fixture.detectChanges();
      });

      it('should be invalid when confirm password does not match password', () => {
        setFieldValue(fixture, 'sign-up-password', '@Aa1234')
        setFieldValue(fixture, 'sign-up-confirmPassword', '123456');
        expect(findEl(fixture, 'sign-up-password').nativeElement.value)
          .not.toEqual(findEl(fixture, 'sign-up-confirmPassword').nativeElement.value);
        expect(confirmPassword.errors?.['invalidConfirmPassword']).toBe(true);
      });

      it('should be valid when confirm password matches password', () => {
        setFieldValue(fixture, 'sign-up-password', '@Aa1234');
        setFieldValue(fixture, 'sign-up-confirmPassword', '@Aa1234');
        expect(findEl(fixture, 'sign-up-password').nativeElement.value)
          .toEqual(findEl(fixture, 'sign-up-confirmPassword').nativeElement.value);
        expect(confirmPassword.valid).toBe(true);
      });
    });
  });

  describe('Registration Form UI', () => {
    it('should have logo title', async () => {
      expectText(fixture, 'logo-title', 'NT BOOKSTORE');
    });

    it('should have 4 input fields', async () => {
      const registrationFormElement = findEl(fixture, 'sign-up-form').nativeElement;
      const inputElements = registrationFormElement.querySelectorAll('input');
      expect(inputElements.length).toEqual(4)
    });

    it('should submit button is called "Sign Up"', async () => {
      expectText(fixture, 'sign-up-button', 'Sign Up');
    });

  });

});
