import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import {AfterViewInit , ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CurrencyService } from 'src/app/service/currency.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {

  constructor(private api: ApiService, private router:Router,private currencyService : CurrencyService) { }

  coins : any[] = []; //array che conterrà tutte le monete in trend per il jumbotron

  dataSource = new MatTableDataSource<any>(this.coins);
  currency : string ="";
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();
    this.currencyService.getCurrency().subscribe( val => {
      this.currency = val;
      this.getAllData();
      this.getBannerData();
    })
  }
  //ottieni tutti risposta e riempi la tabella di angular material
  getAllData(){
    this.api.getCurrency(this.currency)
    .subscribe(res=>{
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
  }
  //ottieni le monete in trending per il jumbotron e popola l'array coins
  getBannerData(){
    this.api.getTrendingCurrency(this.currency)
    .subscribe(res => {
      this.coins = res;
    })
  }
  //funzione per aprire la moneta cliccata
  goToCoin(element:any){
    this.router.navigate(["coin-detail"], { queryParams: { id: element.id } });
  }
}
