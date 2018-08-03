import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';

import{ ListPage } from '../list/list';
import{ SignupPage } from '../signup/signup';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user =  {};
  error_message = '';
  userid: number = -1;
  //show_error_message= false;
  constructor(public navCtrl: NavController, public http: HttpClient, public storage: Storage) {
    // Or to get a key/value pair
    this.storage.get('userid').then((data)=>{
      this.userid = data;
      this.storage.get('loggedIn').then((val) => {
        if(val){
          this.navCtrl.setRoot(ListPage,{
            userid: this.userid
          });
        }
      });
    });
  }

  login() {
    this.http.post('http://localhost:8080/login', {
        username : this.user.username,
        password: this.user.password
      },
      {
        headers: { 'Content-Type': 'application/json' }
      })
      .subscribe((res : {valid, user}) => {
        if (!res.valid){
          this.error_message = "Username or password incorrect";
        }else{
          this.error_message = '';
          this.username = '';
          this.password = '';
          this.storage.set('userid', res.user._id);
          this.storage.set('loggedIn', true);
          this.navCtrl.push(ListPage,{
              userid: res.user._id
          });
        }

      }, (err) => {
        this.error_message = "Username not found. Please sign up.";
      });
    this.storage.set('loggedIn', false);
  }

  register(){
    this.navCtrl.push(SignupPage);
  }
}
