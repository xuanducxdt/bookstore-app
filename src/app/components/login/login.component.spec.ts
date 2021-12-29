import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { LoginComponent } from './login.component';
import {
  findEl,
  expectText,
  setFieldValue
} from '../../spec-helpers/element.spec-helper';
import { confirmPassword, email, fullName, password, signUpData } from 'src/app/spec-helpers/signup-data.spec-helper';
import { FieldErrorDisplayComponent } from '../field-error-display/field-error-display.component';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const fillForm = () => {
    setFieldValue(fixture, 'sign-up-fullName', fullName);
    setFieldValue(fixture, 'sign-up-email', email);
    setFieldValue(fixture, 'sign-up-password', password);
    setFieldValue(fixture, 'sign-up-confirmPassword', confirmPassword);
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        FieldErrorDisplayComponent
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
        JwtHelperService
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
    it('should disable "Sign Up" button when form is invalid', fakeAsync(async () => {
      const { signUpForm } = component;
      spyOn(component, 'signUp');

      const signUpFormElement = findEl(fixture, 'sign-up-form').nativeElement;
      const button = signUpFormElement.querySelector('button[data-testid="sign-up-button"]');
      button.click();
      tick();

      expect(component.signUp).not.toHaveBeenCalled();

      expect(signUpForm.invalid).toEqual(true);
      expect(findEl(fixture, 'sign-up-button').properties?.['disabled']).toBe(true);
    }));

    it('should enable "Sign Up" button when form is valid', fakeAsync(async () => {
      fillForm();
      fixture.detectChanges();
      const { signUpForm } = component;
      spyOn(component, 'signUp');

      const signUpFormElement = findEl(fixture, 'sign-up-form').nativeElement;
      const button = signUpFormElement.querySelector('button[data-testid="sign-up-button"]');
      button.click();
      tick();

      expect(component.signUp).toHaveBeenCalled();
      expect(signUpForm.valid).toEqual(true);
      expect(signUpForm.value).toEqual(signUpData);
      expect(findEl(fixture, 'sign-up-button').properties?.['disabled']).toBe(false);
    }));

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
        fixture.detectChanges();

        const signUpFormElement = findEl(fixture, 'sign-up-form').nativeElement;
        const fieldErrorDisplayElement = signUpFormElement.querySelector('app-field-error-display[fieldcontrol="email"]');
        const errorMessageElement = fieldErrorDisplayElement.querySelector('div[class="error-message"]');

        expect(errorMessageElement.textContent.trim()).toEqual('Invalid email format.')
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
        fixture.detectChanges();

        const signUpFormElement = findEl(fixture, 'sign-up-form').nativeElement;
        const fieldErrorDisplayElement = signUpFormElement.querySelector('app-field-error-display[fieldcontrol="password"]');
        const errorMessageElement = fieldErrorDisplayElement.querySelector('div[class="error-message"]');

        expect(errorMessageElement.textContent.trim()).toEqual('Invalid password format.')
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
        fixture.detectChanges();

        const signUpFormElement = findEl(fixture, 'sign-up-form').nativeElement;
        const fieldErrorDisplayElement = signUpFormElement.querySelector('app-field-error-display[fieldcontrol="confirmPassword"]');
        const errorMessageElement = fieldErrorDisplayElement.querySelector('div[class="error-message"]');

        expect(errorMessageElement.textContent.trim()).toEqual('Confirm password must match password.')
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
