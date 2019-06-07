import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { User } from './user';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  formSignin: FormGroup;

  constructor(
    private http: Http,
    public navCtrl: NavController,
    public menu: MenuController,
    private fb: FormBuilder,
    private storage: Storage) { }

  ngOnInit(): any {
    this.formSignin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login() {
    this.onSignin(this.formSignin.value);
  }

  onSignin(user: User) {
    console.log(this.formSignin.value);
    console.log(user);
    let headers = new Headers(
      {
        'Content-Type': 'application/json; charset=utf-8'
      });
    let options = new RequestOptions({ headers: headers });

    this.http.post('https://test-back-troca.herokuapp.com/signin', user, options)
      .toPromise()
      .then((response) => {
        console.log('API Response : ', response.json());
        var obj = response.json();
        this.storage.set('name', obj.name);
        this.storage.set('admin', obj.admin);
        this.storage.set('email', obj.email);
        this.storage.set('exp', obj.exp);
        this.storage.set('iat', obj.iat);
        this.storage.set('id', obj.id);
        this.storage.set('token', obj.token);
        this.navCtrl.setRoot('CategoriasPage');
      })
      .catch((error) => {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
      });
  }

  registrar() {
    this.navCtrl.push('RegistroPage');
  }

  logout() {
    this.storage.clear();
    this.navCtrl.push('HomePage');
  }

}
