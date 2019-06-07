import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
import { Product } from './product';

/**
 * Generated class for the RegistroProduto page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registroProduto',
  templateUrl: 'registroProduto.html',
})
export class RegistroProdutoPage {

  formRegisterProduct: FormGroup;

  constructor(
    private http: Http,
    public navCtrl: NavController,
    public menu: MenuController,
    private fb: FormBuilder,
    private storage: Storage) { }

  ngOnInit(): any {
    this.formRegisterProduct = this.fb.group({
      productName: ['', Validators.required],
      productType: ['', Validators.required],
      productBrand: ['', Validators.required],
      productDescription: ['', Validators.required],
      productAge: ['', Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroProdutoPage');
  }

  registerProduct() {
    this.onSignin(this.formRegisterProduct.value);
  }

  onSignin(product: Product) {
    console.log(product);
    this.storage.get('token').then((val) => {
      console.log('Your token is', val);
    });
  }

}
