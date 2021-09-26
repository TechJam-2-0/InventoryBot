import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalpayPage } from './modalpay.page';

const routes: Routes = [
  {
    path: '',
    component: ModalpayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalpayPageRoutingModule {}
