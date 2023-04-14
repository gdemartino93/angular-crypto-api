import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss']
})
export class CoinDetailComponent implements OnInit {

  coinId : any;
  coinData !: any;
  constructor(private api : ApiService,private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(el =>{
      this.coinId = el['id'];
    })
    this.getSingleCoin();
  }
getSingleCoin(){
  this.api.getCurrencyById(this.coinId)
    .subscribe(res => {
      this.coinData = res;
      console.log(this.coinData)
    })
}
}
