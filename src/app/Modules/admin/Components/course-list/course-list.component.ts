import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NgxSpinnerService } from 'ngx-spinner';
import { TuiDialogService } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { CourseService } from '../../Services/course.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
  rows = [];
  studentList = [];
  ColumnMode = ColumnMode;

  constructor(
    private spinerService: NgxSpinnerService,
    private courseService: CourseService,
    private router: Router,
    private dialogService: TuiDialogService
  ) {}

  ngOnInit() {
    this.getStudentList();
  }
  
  getStudentList() {
    this.spinerService.show();
    this.courseService.getAllCourse().subscribe(
      (res: any) => {
        if (res.length > 0) {
          this.studentList = res;
          this.spinerService.hide();
        }
        this.spinerService.hide();
      },
      (error) => {
        this.spinerService.hide();
      }
    );
  }
  getBase64Image(base64Image: string) {
    
    return 'data:image/png;base64,' + base64Image;
  }

  AddCourse() {
    this.router.navigate(["/admin/course/add"]);
  }

  updateStudent(data: any) {
    this.router.navigate(['/admin/student-list/update'], {
      queryParams: { studnetId: data.id },
    });
  }
  viewStudent(data: any) {
    this.router.navigate(['/admin/student-list/view'], {
      queryParams: { studnetId: data.id },
    });
  }

  deleteStudent(data: any) {
   
  }
}
