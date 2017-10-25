import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Api } from '../api/api';
import { Globalvar } from '../globalvar/globalvar';
import { Events } from 'ionic-angular';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;
  public isLogin: boolean;
  public account: {
      id: number,
      name: string,
      email: string,
      password: string,
      token: string,
      created_at: string,
      updated_at: string,
      } = {
      id: 0,
      name: '',
      email: '',
      password: '',
      token: '',
      created_at: '',
      updated_at: '',      
  };
  
    public accountTest: {
      id: number,
      name: string,
      email: string,
      password: string,
      api_token: string,
      created_at: string,
      updated_at: string,
      
  } = {
      id: 999,
      name: 'ccc',
      email: '222',
      password: '333',
      api_token: '444',
      created_at: 'ccc',
      updated_at: 'uuu',
  };

  constructor(public api: Api, public storage: Storage, public events: Events,public globalvar: globalvar,) {
    }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  
  
  public logIn(accountInfo: any) :Promise<string>  {
    return this.api.post('login', accountInfo) // Use the function we just wrote
                .then(res => {
                    this.setAccountToDB(res.data);
                    this.account = JSON.parse(res.data);    
                    this.globalvar.token = this.acount.token;                
                    if(accountInfo.email == this.account.email){
                        return "pass";
                    }else{
                        return "no";
                    }
                }).catch((err) => {
                    console.log('second catch: ' + err.message ) ; // never called
                    return err.message;
    });
  }

  signup(accountInfo: any) {
    //let seq = this.api.post('signup', accountInfo);
    this.api.post('signup', accountInfo).then(data=>{
      console.log(data.status);
      return true;
      })
      .catch(error => {

          console.log(error.status);
          console.log(error.error); // error message as string

          return false;
      });
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
  
  getAccountFromDB(){

    this.getValue('AccountDB')
        .then(acc => {
        this.account = JSON.parse(acc);
      });
    return this.account;    
  }
  
  getValue(key: string) {
    return this.storage.get(key)
      .then(res => {
        return res;
      });
  }
  
  setValue(key: string, value: any) {
    return this.storage.set(key, value);
  }
  
  public setAccountToDB(value: any) {
    return this.setValue("AccountDB", value);
  }
  
  
  
}
