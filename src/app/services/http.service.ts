import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private storageService: StorageService) {}

  async getToken(): Promise<string> {
    let token = '';

    return new Promise(async (resolve) => {
      await this.storageService.get('authUser').then(response => {
        token = response.token;
  
        console.log(token);

        resolve(token);
      });
    });
  }

  get(endpoint: string): Observable<any> {

    const token = this.getToken();

    let headers = new HttpHeaders({
      Authorization: `Bearer ${ token }`
    });

    return this.http.get(`${ this.apiUrl }/${ endpoint }`, { headers: headers });
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${ this.apiUrl }/${ endpoint}`, data);
  }

  put(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${ this.apiUrl }/${ endpoint}`, data);
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${ this.apiUrl }/${ endpoint }`);
  }

  getPublicApi(fullUrl: string): Observable<any> {
    return this.http.get(fullUrl);
  }

  postPublicApi(fullUrl: string, data: any): Observable<any> {
    return this.http.post(fullUrl, data);
  }

  postMultipart(endpoint: string, data: any): Observable<any> {
    let headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });

    return this.http.post(`${ this.apiUrl }/${ endpoint}`, data, { headers: headers });
  }
}
