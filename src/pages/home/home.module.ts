import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [HomePage],
  imports: [
    HttpModule,
    IonicPageModule.forChild(HomePage)
  ]
})
export class HomeModule {

}
