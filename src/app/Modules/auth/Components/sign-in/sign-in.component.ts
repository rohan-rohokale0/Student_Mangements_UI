import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  showPassword = false;
  SignInForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.SignInForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    console.log('this.showPassword', this.showPassword);
  }

  login() {
    if (this.SignInForm.valid) {
      this.authService.signIn(this.SignInForm.value).subscribe({
        next: (res) => {
          this.authService.storeUserDetails(res);
          this.authService.storeToken(res.accessToken);
          this.authService.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.authService.decodedToken();
          this.router.navigate(['/admin/dashbaord']);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
  naviagteToSignUpPage() {
    this.router.navigate(['auth/sign-up']);
  }
  login1() {
    this.router.navigate(['/admin/course']);
  }

  get emailErrorMessage() {
    const emailControl = this.SignInForm.get('email');
    if (emailControl?.errors) {
      if (emailControl.errors['required']) {
        return 'Please enter your email address.';
      } else if (emailControl.errors['email']) {
        return 'Please enter a valid email address.';
      }
    }
    return '';
  }
}
