import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllData();
  }
  getAllData(){
    this.api.getCurrency('EUR')
    .subscribe(res=>{
      console.log(res)
    })
  }
}
