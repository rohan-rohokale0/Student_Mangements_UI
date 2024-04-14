import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private httpClient: HttpClient) {}

  getData<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }
  getWithParams<T>(url: string, inparams: any): Observable<T> {
    let httpParams = new HttpParams();
    inparams.forEach((ipValue:any) => {
      httpParams = httpParams.append(ipValue.key, ipValue.value);
    });
    const retReq = this.httpClient.get<T>(url, {params: httpParams});
    return retReq;
  }

  postData<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(url, body);
  }
  getFileData(url: string) {
    return this.httpClient
        .get(url, {responseType: 'blob', observe: 'body' })
}
  postFileData(url: string, body: any): Observable<any> {
    return this.httpClient.post(url,body, {responseType: 'blob'});
  }

  putData<T>(url: string, body: string): Observable<T> {
    return this.httpClient.put<T>(url, body);
  }

  deleteData<T>(url: string): Observable<any> {
    return this.httpClient.delete<T>(url);
  }

  patchData<T>(url: string, body: string): Observable<T> {
    return this.httpClient.patch<T>(url, body);
  }
}
