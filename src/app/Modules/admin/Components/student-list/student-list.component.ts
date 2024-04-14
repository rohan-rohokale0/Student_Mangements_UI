import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import {
  ColumnMode,
  DatatableComponent,
  NgxDatatableModule,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { CommonServiceService } from '../../Services/common-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { StudentService } from '../../Services/student.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { TuiDialogService, TuiNotificationModule } from '@taiga-ui/core';
import { DeleteStudentComponent } from './delete-student/delete-student.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    FontAwesomeModule,
    TuiNotificationModule,
  ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent {
  rows = [];
  studentList = [];

  ColumnMode = ColumnMode;
  optionsBasicNoData = {};
  noDataMessage = '';

  constructor(
    private spinerService: NgxSpinnerService,
    private studentService: StudentService,
    private router: Router,
    private dialogService: TuiDialogService
  ) {}

  ngOnInit() {
    this.getStudentList();
  }
  getStudentList() {
    this.spinerService.show();
    this.studentService.getAllStudnet().subscribe(
      (res: any) => {
        if (res.length > 0) {
          this.studentList = res;
          this.noDataMessage = '';
          this.spinerService.hide();
        } else {
          this.noDataMessage = 'No data available in table';
        }
        this.spinerService.hide();
      },
      (error) => {
        this.spinerService.hide();
      }
    );
  }

  AddStudent() {
    this.router.navigate(['/admin/student-list/add-student']);
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
    this.dialogService
      .open(new PolymorpheusComponent(DeleteStudentComponent))
      .pipe(
        switchMap((confirmed: any) => {
          if (confirmed) {
            this.Delete(data.id);
            // Implement your delete logic here, possibly making an API call
            //return this.deleteStudentApi(); // Assuming this is an Observable
          }
          return [];
        })
      )
      .subscribe({
        next: () => {
          //this.notificationsService.show('Student deleted successfully.', { status: TuiNotification.Success }).subscribe();
        },
        error: (error) => {
          // this.notificationsService.show('Failed to delete student.', { status: TuiNotification.Error }).subscribe();
        },
      });
  }

  Delete(id: any) {
    this.spinerService.show();
    this.studentService.deleteStudent(id).subscribe(
      (response) => {
        if (response.success) {
          this.getStudentList();
          this.spinerService.hide();
        }
      },
      (error) => {
        this.spinerService.hide();
        console.error('Error saving data:', error);
      }
    );
  }
}
