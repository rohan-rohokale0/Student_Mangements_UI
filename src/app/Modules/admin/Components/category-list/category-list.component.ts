import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TuiDialogService, TuiNotificationModule } from '@taiga-ui/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { StudentService } from '../../Services/student.service';
import { Router } from '@angular/router';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { DeleteStudentComponent } from '../student-list/delete-student/delete-student.component';
import { switchMap } from 'rxjs';
import { CategoryService } from '../../Services/category.service';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { takeUntil } from 'rxjs/operators';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    FontAwesomeModule,
    TuiNotificationModule,
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent {
  rows = [];
  studentList = [];
  ColumnMode = ColumnMode;

  constructor(
    private spinerService: NgxSpinnerService,
    private categoryService: CategoryService,
    private router: Router,
    private dialogService: TuiDialogService
  ) {}

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    this.spinerService.show();
    this.categoryService.getAllCategory().subscribe(
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

  AddCategory() {
    this.dialogService
      .open(new PolymorpheusComponent(AddCategoryComponent))
      .pipe(
        switchMap((confirmed: any) => {
          if (confirmed) {
            this.getAllCategory();
          }
          return [];
        })
      )
      .subscribe({
        next: () => {},
        error: (error) => {},
      });
  }

  updateCategoey(data: any) {
    this.dialogService
      .open(new PolymorpheusComponent(UpdateCategoryComponent), {
        closeable: true,
        data: {
          id: data.id,
        },
      })
      .pipe(
        switchMap((confirmed: any) => {
          if (confirmed) {
            this.getAllCategory();
          }
          return [];
        })
      )

      .subscribe();
  }
  viewCategory(data: any) {
    this.dialogService
      .open(new PolymorpheusComponent(ViewCategoryComponent), {
        closeable: true,
        data: {
          id: data.id,
        },
      })
      .pipe(
        switchMap((confirmed: any) => {
          if (confirmed) {
            this.getAllCategory();
          }
          return [];
        })
      )

      .subscribe();
  }

  deleteCategory(data: any) {
    this.dialogService
      .open(new PolymorpheusComponent(DeleteCategoryComponent), {
        closeable: true,
        data: {
          id: data.id,
        },
      })
      .pipe(
        switchMap((confirmed: any) => {
          if (confirmed) {
            this.getAllCategory();
          }
          return [];
        })
      )
      .subscribe({});
  }
}
