import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import {AfterViewInit , ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { log } from 'console';
@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {

  constructor(private api: ApiService) { }

  coins : any[] = [];
  dataSource = new MatTableDataSource<any>(this.coins);
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    // this.getAllData();
    this.getBannerData();
  }
  getAllData(){
    this.api.getCurrency('EUR')
    .subscribe(res=>{
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
      console.log(this.dataSource)
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
