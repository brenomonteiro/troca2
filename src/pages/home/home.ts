import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { User } from './user';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  form: FormGroup;

  private url: string = 'https://test-back-troca.herokuapp.com/signin';

  private authenticated = false;


  constructor(
    private http: Http,
    public navCtrl: NavController,
    public menu: MenuController,
    private fb: FormBuilder
  ) { }

  ngOnInit(): any {
    this.form = this.fb.group({
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
    this.onSignin(this.form.value);
  }

  onSignin(user: User) {
    console.log(this.form.value);
    console.log(user);
    let headers = new Headers(
      {
        'Content-Type': 'application/json; charset=utf-8'
      });
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post('https://test-back-troca.herokuapp.com/signin', user, options)
        .toPromise()
        .then((response) => {
          console.log('API Response : ', response.json());
          this.navCtrl.setRoot('CategoriasPage');
        })
        .catch((error) => {
          console.error('API Error : ', error.status);
          console.error('API Error : ', JSON.stringify(error));
        });
    });

    this.navCtrl.setRoot('CategoriasPage');
  }
  registrar() {

    this.navCtrl.push('RegistroPage');
  }

  logout() {
    this.navCtrl.push('HomePage');
  }

}
