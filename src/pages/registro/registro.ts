import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { User } from '../home/user';
/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  formRegister: FormGroup;

  constructor(
    private http: Http,
    public navCtrl: NavController,
    public menu: MenuController,
    private fb: FormBuilder
  ) { }

  ngOnInit(): any {
    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  login() {
    this.onSignin(this.formRegister.value);
  }

  onSignin(user: User) {
    console.log(this.formRegister.value);
    console.log(user);
    let headers = new Headers(
      {
        'Content-Type': 'application/json; charset=utf-8'
      });
    let options = new RequestOptions({ headers: headers });

    this.http.post('https://test-back-troca.herokuapp.com/signup', user, options)
      .toPromise()
      .then((response) => {
        console.log('API Response : ', response.json());
        this.navCtrl.setRoot('CategoriasPage');
      })
      .catch((error) => {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
      });
  }

}
