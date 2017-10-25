import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'vachara.p2@gmail.com',
    password: '123456'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    //data : any = this.user.login(this.account);
    //let data : any = this.user.login(this.account);
    
    //if (this.user.isLogin){
    
    this.user.logIn(this.account)
      .then( res => {
        console.log(res);
        if(res=="pass"){
          this.navCtrl.push(MainPage);     
        }else{
          let toast = this.toastCtrl.create({
          message: res,
          duration: 3000,
          position: 'top'
      });
      toast.present();
          
        }
      }, (err) => {
      //this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
    
  }
  
  
    /*
        this.user.login(this.account).subscribe((resp) => {
      //this.navCtrl.push(MainPage);
    }, (err) => {
      //this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
  
  */
   //   console.log(JSON.stringify(this.responseData));
      //localStorage.setItem('userData', JSON.stringify(this.responseData));
      //this.navCtrl.push(TabsPage);
      
    //console.log (data.id);
    /*
    .subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
    */
  
}
