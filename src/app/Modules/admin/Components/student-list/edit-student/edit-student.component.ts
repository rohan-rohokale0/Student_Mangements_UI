import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StudentService } from '../../../Services/student.service';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent {
  updateStudent!: FormGroup;
  studnetId:any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private spinerService: NgxSpinnerService,
    private studentService: StudentService,
    private routers: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.initForm();
    this.routers.queryParamMap.subscribe((params) => {
      const id = params.get('studnetId');
      this.studnetId = id;
      this.getStudentById();
    });
  }

  initForm() {
    this.updateStudent = this.formBuilder.group({
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
  getStudentById()
  {
    this.spinerService.show();
    this.studentService.getStudentById(this.studnetId).subscribe(
      (res: any) => {
        this.updateStudent.controls['firstName'].setValue(res.firstName);
        this.updateStudent.controls['lastName'].setValue(res.lastName);
        this.updateStudent.controls['email'].setValue(res.email);
        this.updateStudent.controls['phoneNumber'].setValue(res.phoneNumber);
        this.updateStudent.controls['education'].setValue(res.education);
        this.updateStudent.controls['schoolName'].setValue(res.schoolName);
        this.updateStudent.controls['address'].setValue(res.address);
        this.updateStudent.controls['city'].setValue(res.city);
        this.spinerService.hide();
      },
      (error) => {
        this.spinerService.hide();
      }
    );
  }

  updateStudents(form: any) {
    if (this.updateStudent.invalid) {
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
    this.studentService.updateStudent(this.studnetId,payload).subscribe(
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
