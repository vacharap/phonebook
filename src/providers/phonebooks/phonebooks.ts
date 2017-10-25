import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Api } from '../api/api';
import { Events } from 'ionic-angular';
import { Globalvar } from '../globalvar/globalvar';
import { Phonebook } from '../phonebook/phonebook';
import { Contacts } from '../contacts/contacts';
import { Contact } from '../contact/contact';

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
export class Phonebooks {
  public phonebook: {
      id: number,
      name: string,
      created_at: string,
      updated_at: string,
      };

  public phonebooks: phonebook[];
  
  public phonebookTest: {
      id: number,
      name: string,
      created_at: string,
      updated_at: string,
  } = {
      id: 999,
      name: 'ccc',
      created_at: 'ccc',
      updated_at: 'uuu',
  };


  constructor(public api: Api, public storage: Storage, public events: Events, public globalvar: Globalvar) {
    }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  
  
  public logIn(accountInfo: any) :Promise<string>  {
    return this.api.post('login', accountInfo) // Use the function we just wrote
                .then(res => {
                    this.setPhonebookToDB(res.data);
                    this.account = JSON.parse(res.data);                    
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

  /**
   * Process a login/signup response to store user data
   */

  getPhonebookFromCloud(){
    return this.api.get('books', {}, this.globalvar.token) // Use the function we just wrote
                .then(res => {
                    this.setPhonebookToDB(res.data);
                    this.phonebooks = JSON.parse(res.data);                    
                    if(this.phonebooks.error == "Unauthenticated"){
                        return "no";
                    }else{
                        return "pass";
                    }
                }).catch((err) => {
                    console.log(err.message ) ; // never called
                    return err.message;
    });
  } 

  getPhonebookFromDB(){

    this.getValue('PhonebookDB')
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
  
  public setPhonebookToDB(value: any) {
    return this.setValue("PhonebookDB", value);
  }
  
  
  
}
