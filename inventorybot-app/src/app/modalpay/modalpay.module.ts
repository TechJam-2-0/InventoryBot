import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalpayPageRoutingModule } from './modalpay-routing.module';

import { ModalpayPage } from './modalpay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalpayPageRoutingModule
  ],
  declarations: [ModalpayPage]
})
export class ModalpayPageModule {}
