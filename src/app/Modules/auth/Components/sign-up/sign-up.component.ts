import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      confirmPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    console.log('this.showPassword', this.showPassword);
  }

  signUp() {
    // if (this.signUpForm.valid) {
    //   this.spinner.show();
    //   if (this.signUpForm.controls['password'].value === this.signUpForm.controls['confirmPassword'].value) {
    //     this.angularFireAuth.createUserWithEmailAndPassword(this.signUpForm.controls['email'].value, this.signUpForm.controls['password'].value)
    //       .then((res: any): any => {
    //         const result = {
    //           firstName: this.signUpForm.controls['firstName'].value,
    //           lastName: this.signUpForm.controls['lastName'].value,
    //           email: this.signUpForm.controls['email'].value,
    //           password: this.signUpForm.controls['password'].value,
    //           createdAt: new Date().getTime(),
    //           status: true,
    //           userRole: '2'
    //         };
    //         this.spinner.hide();
    //         this.authService.setCollectionDataById('DatabaseLogin', res.user.uid, result).then(() => {
    //           const firstName = {
    //             firstName: result.firstName,
    //             lastName: result.lastName
    //           };
    //           sessionStorage.setItem('firstName', JSON.stringify(firstName));
    //           this.spinner.hide();
    //           this.matSnackBar.open(('Your account is successfully created, Please check email!'), 'close',
    //             {
    //               duration: 5000
    //             });
    //           this.authService.verificationMail();
    //           this.router.navigate(['/auth/basic-details'],{ queryParams: { id: res.user.uid }});
    //         }).catch((err:any) => {
    //           this.spinner.hide();
    //           this.matSnackBar.open(err.message, 'close',
    //             {
    //               duration: 5000
    //             });
    //         });
    //       }).catch((err:any) => {
    //         this.spinner.hide();
    //         this.matSnackBar.open(err.message, 'close',
    //           {
    //             duration: 5000
    //           });
    //       });
    //   } else {
    //     this.spinner.hide();
    //   }
    // }
  }
  navigateToSignInPage() {
    this.router.navigate(['/auth/sign-in']);
  }
}
