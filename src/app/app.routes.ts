import { Routes } from '@angular/router';
import { CommonHeaderSidebarComponent } from './Common_SideBar_Header/common-header-sidebar/common-header-sidebar.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./Modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    component: CommonHeaderSidebarComponent,
    loadChildren: () =>
      import('./Modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    redirectTo: '/auth/sign-in',
    pathMatch: 'full',
  },
];
