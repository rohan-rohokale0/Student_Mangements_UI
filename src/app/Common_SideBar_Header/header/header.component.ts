import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../Modules/shared/shared.module';
import { CommonServiceService } from '../../Modules/admin/Services/common-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  loginUserDetails: any;

  constructor(private commonService: CommonServiceService) {
    this.loginUserDetails = commonService.getUserDetails();
    const data=JSON.parse(this.loginUserDetails);
    this.loginUserDetails=data;
  }
 
}
