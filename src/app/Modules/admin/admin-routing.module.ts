import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { StudentListComponent } from './Components/student-list/student-list.component';
import { AddStudentComponent } from './Components/student-list/add-student/add-student.component';
import { EditStudentComponent } from './Components/student-list/edit-student/edit-student.component';
import { ViewStudentComponent } from './Components/student-list/view-student/view-student.component';
import { CategoryListComponent } from './Components/category-list/category-list.component';
import { CourseListComponent } from './Components/course-list/course-list.component';
import { AddCourseComponent } from './Components/course-list/add-course/add-course.component';
import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  {
    path: 'dashbaord',canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: 'student-list',
    children: [
      {
        path: 'add-student',
        component: AddStudentComponent,
      },
      {
        path: 'update',
        component: EditStudentComponent,
      },
      {
        path: 'view',
        component: ViewStudentComponent,
      },
      {
        path: '',
        component: StudentListComponent,
      },
    ],
  },
  {
    path: 'category',
    children: [
      {
        path: '',
        component: CategoryListComponent,
      },
    ],
  },
  {
    path: 'course',
    children: [
      {
        path:'add',
        component:AddCourseComponent
      },
      {
        path: '',
        component: CourseListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
