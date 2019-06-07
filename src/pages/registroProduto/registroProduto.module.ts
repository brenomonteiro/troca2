import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroProdutoPage } from './registroProduto';

@NgModule({
  declarations: [
    RegistroProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroProdutoPage),
  ],
})
export class RegistroPageModule {}
