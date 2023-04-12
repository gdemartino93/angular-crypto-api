import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinListComponent } from './component/coin-list/coin-list.component';
import { CoinDetailComponent } from './component/coin-detail/coin-detail.component';

const routes: Routes = [
  {
    path : 'coin-list',
    component : CoinListComponent
  },
  {
    path : 'coin-detail',
    component : CoinDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
