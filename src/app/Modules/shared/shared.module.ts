import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TaiaModule } from './Common_Module_File/Taiga.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TokenInterceptor } from '../../token.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule,  FormsModule, ReactiveFormsModule,HttpClientModule,NgxSpinnerModule,TaiaModule,NgxDatatableModule],
  exports: [ FormsModule, ReactiveFormsModule,HttpClientModule,NgxSpinnerModule,TaiaModule,NgxDatatableModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class SharedModule {}
