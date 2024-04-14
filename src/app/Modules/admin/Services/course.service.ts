import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../shared/Services/http-request.service';
import { Observable } from 'rxjs';
import { ApiUrlConstants } from '../../shared/Common_Module_File/ApiUrlConstants';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private httpRequestService: HttpRequestService) {}

  getAllCourse(): Observable<any> {
    return this.httpRequestService.getData<any>(ApiUrlConstants.GetAllCourse);
  }

  AddCourse(data: any): Observable<any> {
    return this.httpRequestService.postData<any>(
      ApiUrlConstants.AddCourse,
      data
    );
  }
}