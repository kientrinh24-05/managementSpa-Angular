
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiUploadService {
  public host = environment.apiUrl;
  private options = { headers: new HttpHeaders().set('Content-Type', 'multipart/form-data') };
  constructor(private _http: HttpClient, public router: Router) {}

  post(url: string, obj: any) {
    console.log(url ,'url');
    
    //const body = JSON.stringify(obj);
    let cloneHeader: any = {};
    cloneHeader['Content-Type'] = 'multipart/form-data';
    const headerOptions = new HttpHeaders(cloneHeader);
    console.log(headerOptions);
    
    return this._http
      .post<any>(this.host + url, obj , this.options)
      .pipe(
        map(res => {
          return res;
        })
      );      
  }

  put(url: string, obj: any) {
    const body = JSON.stringify(obj);
    // let cloneHeader: any = {};
    // cloneHeader['Content-Type'] = 'application/json';
    // const headerOptions = new HttpHeaders(cloneHeader);
    return this._http
      .put<any>(this.host + url, body)
      .pipe(
        map(res => {
          return res;
        })
      );      
  }

  get(url: string) {
    // let cloneHeader: any = {};
    // cloneHeader['Content-Type'] = 'application/json';
    // const headerOptions = new HttpHeaders(cloneHeader);
    return this._http
      .get(this.host + url)
      .pipe(
        map(res  => {
          return res;
        })
      );       
  } 
}
