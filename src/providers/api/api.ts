//    import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'https://myphonebook.asia/api';

  constructor(public http: HTTP) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    //return this.http.get(this.url + '/' + endpoint, {},{});
  }

  getWithToken(endpoint: string, params: any, token: string) {
    return this.http.get( this.url + '/' + endpoint, params, {headers: {'Authorization': 'Bearer ' + token}});
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post('http://myphonebook.asia/api/login', body, {});
  }

  postWithToken(endpoint: string, body: any, token: string) {
    return this.http.post( this.url + '/' + endpoint, body, {headers: {'Authorization': 'Bearer ' + token}});
  }
  
  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }
/*
  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }
*/
  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }
}
