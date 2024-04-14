import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from '../../Modules/admin/Services/common-service.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() sidebarOpen: any;
  routerName: any;
  constructor(
    private router: Router,
    private commonService: CommonServiceService
  ) {
    this.commonService.getValue().subscribe((value) => {
      this.routerName = value;
    });
  }

  ngOnInit() {
    this.getCurrentRouteName();
  }

  navigateToDashboard() {
    this.router.navigate(['/admin/dashbaord']);
    this.commonService.setValue('dashboard');
  }
  navigateToUserList() {
    this.router.navigate(['/admin/student-list']);
    this.commonService.setValue('studentList');
  }
  navigateToCategory() {
    this.router.navigate(['/admin/category']);
  }
  navigateToCourse() {
    this.router.navigate(['/admin/course']);
  }

  getCurrentRouteName() {
    const currentUrl = this.router.url;
    switch (currentUrl) {
      case '/admin/dashbaord':
        this.routerName = 'dashboard';
        break;

      case '/admin/student-list':
        this.routerName = 'studentList';
        break;
      case '/admin/student-list/add-student':
        this.routerName = 'studentList';
        break;
      case '/admin/student-list/update':
        this.routerName = 'studentList';
        break;
      case '/admin/category':
        this.routerName = 'category';
        break;
      case '/admin/course':
        this.routerName = 'course';
        break;

        case '/admin/course/add':
          this.routerName = 'course';
          break;

      // Add more cases for other routes as needed
      default:
        this.routerName = 'dashboard';
        break;
    }
  }
}
