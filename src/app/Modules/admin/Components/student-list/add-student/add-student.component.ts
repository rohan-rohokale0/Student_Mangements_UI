import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { Router } from '@angular/router';
import { StudentService } from '../../../Services/student.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css',
})
export class AddStudentComponent {
  addStudentForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private spinerService: NgxSpinnerService,
    private studentService: StudentService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addStudentForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      education: ['', Validators.required],
      schoolName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  addStudent(form: any) {
    if (this.addStudentForm.invalid) {
      return;
    }
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phoneNumber: form.phoneNumber,
      education: form.education,
      schoolName: form.schoolName,
      address: form.address,
      city: form.city,
    };
    this.studentService.AddStudent(payload).subscribe(
      (response) => {
        if (response.success) {
          this.backToStudentList();
        }
        this.spinerService.hide();
        console.log(response.message);
      },
      (error) => {
        this.spinerService.hide();
        console.error('Error saving data:', error);
      }
    );
  }

  backToStudentList() {
    this.router.navigate(['/admin/student-list']);
  }

  markFormControlsTouched(form: NgForm): void {
    // Mark all form controls as touched to trigger validation
    Object?.values(form.controls).forEach((control) => {
      if (control instanceof Array) {
        control.forEach((c) => this.markFormControlsTouched(c));
      } else {
        control.markAsTouched();
      }
    });
  }
}
