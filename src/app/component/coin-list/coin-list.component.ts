import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {

  constructor(private api: ApiService) { }

  coins : any[] = [];
  ngOnInit(): void {
    // this.getAllData();
    this.getBannerData();
  }
  getAllData(){
    this.api.getCurrency('EUR')
    .subscribe(res=>{
      console.log(res)
    })
  }
  getBannerData(){
    this.api.getTrendingCurrency("EUR")
    .subscribe(res => {
      this.coins = res;
      console.log(this.coins)
    })
  }
}
