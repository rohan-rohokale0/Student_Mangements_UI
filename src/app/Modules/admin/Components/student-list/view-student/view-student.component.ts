import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../Services/student.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent {
  studentId: any;
  studnetList: any;

  constructor(
    private router: Router,
    private routers: ActivatedRoute,
    private studentService: StudentService,
    private spinerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.routers.queryParamMap.subscribe((params) => {
      const id = params.get('studnetId');
      this.studentId = id;
      this.getCourseById(this.studentId);
    });
  }

  getCourseById(id: any) {
    this.spinerService.show();
    this.studentService.getStudentById(id).subscribe(
      (res: any) => {
        this.studnetList = res;
        this.spinerService.hide();
      },
      (error:any) => {
        this.spinerService.hide();
      }
    );
  }

  getBase64Image(base64Image: string) {
    return 'data:image/png;base64,' + base64Image;
  }
  backToStudentList() {
    this.router.navigate(['/admin/student-list']);
  }

}
