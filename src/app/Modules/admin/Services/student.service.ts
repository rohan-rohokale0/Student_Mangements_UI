import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../shared/Services/http-request.service';
import { ApiUrlConstants } from '../../shared/Common_Module_File/ApiUrlConstants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private httpRequestService: HttpRequestService) {}

  getAllStudnet(): Observable<any> {
    return this.httpRequestService.getData<any>(ApiUrlConstants.getAllStudent);
  }
  AddStudent(data: any): Observable<any> {
    return this.httpRequestService.postData<any>(
      ApiUrlConstants.addStudent,
      data
    );
  }

  getStudentById(id: any): Observable<any> {
    return this.httpRequestService.getData<any>(
      `${ApiUrlConstants.getStudentById}${id}`
    );
  }

  updateStudent(id: any, data: any): Observable<any> {
    return this.httpRequestService.putData<any>(
      `${ApiUrlConstants.updateStudentById}${id}`,
      data
    );
  }

  deleteStudent(id: number): Observable<any> {
    return this.httpRequestService.deleteData<any>(
      `${ApiUrlConstants.deleteStudentById}${id}`
    );
  }
}
