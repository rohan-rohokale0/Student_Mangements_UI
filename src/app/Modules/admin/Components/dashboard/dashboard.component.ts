import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(
    private spinerService: NgxSpinnerService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getAllUser();
  }
  getAllUser() {
    this.spinerService.show();
    this.userService.getAllUsers().subscribe(
      (res: any) => {
        if (res.length > 0) {
          //this.studentList = res;
          this.spinerService.hide();
        }
        this.spinerService.hide();
      },
      (error) => {
        
        this.spinerService.hide();
      }
    );
  }
}
