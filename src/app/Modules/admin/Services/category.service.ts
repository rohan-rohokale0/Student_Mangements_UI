import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../shared/Services/http-request.service';
import { Observable } from 'rxjs';
import { ApiUrlConstants } from '../../shared/Common_Module_File/ApiUrlConstants';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpRequestService: HttpRequestService) {}

  getAllCategory(): Observable<any> {
    return this.httpRequestService.getData<any>(ApiUrlConstants.GetAllCategory);
  }

  AddCategory(data: any): Observable<any> {
    return this.httpRequestService.postData<any>(
      ApiUrlConstants.AddCategory,
      data
    );
  }
  getCategoryById(id: any): Observable<any> {
    return this.httpRequestService.getData<any>(
      `${ApiUrlConstants.getCategoryById}${id}`
    );
  }

  updateCategory(id: any, data: any): Observable<any> {
    return this.httpRequestService.putData<any>(
      `${ApiUrlConstants.updateCategoryById}${id}`,
      data
    );
  }

  deleteCategory(id: any): Observable<any> {
    return this.httpRequestService.deleteData<any>(
      `${ApiUrlConstants.deleteCategoryById}${id}`
    );
  }
}
