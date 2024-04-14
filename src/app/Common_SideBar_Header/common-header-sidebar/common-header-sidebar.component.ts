import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../Modules/shared/shared.module';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonServiceService } from '../../Modules/admin/Services/common-service.service';

@Component({
  selector: 'app-common-header-sidebar',
  standalone: true,
  templateUrl: './common-header-sidebar.component.html',
  styleUrl: './common-header-sidebar.component.css',
  imports: [
    RouterOutlet,
    CommonModule,
    SharedModule,
    HeaderComponent,
    SidebarComponent,
  ],
})
export class CommonHeaderSidebarComponent {
  routerName: any;
  constructor(private commonService: CommonServiceService) {
    this.commonService.getValue().subscribe((value) => {
      this.routerName = value;
    });
  }
}
