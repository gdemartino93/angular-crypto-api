import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
//lib grafici
import { ChartConfiguration, ChartType} from 'chart.js'
import { BaseChartDirective} from 'ng2-charts'
import { log } from 'console';
import { CurrencyService } from 'src/app/service/currency.service';
@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss']
})
export class CoinDetailComponent implements OnInit {
  public lineChartData: ChartConfiguration['data'] = {

    datasets: [
      {
        data: [],
        label: `Grafico del valore`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',

      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: { display: true },
    }
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;
  coinId : any;
  coinData !: any;
  days : any;
  currency : string = "";

  constructor(private api : ApiService,private activatedRoute : ActivatedRoute,private currentyService : CurrencyService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(el =>{
      this.coinId = el['id'];
    })
    this.getSingleCoin();
    this.getGraph();
    this.currentyService.getCurrency().subscribe(val => {
      this.currency = val;
      this.getSingleCoin();
      this.getGraph();

    })
  }
getSingleCoin(){
  this.api.getCurrencyById(this.coinId)
    .subscribe(res => {
      this.coinData = res;
      console.log(this.coinData)
    })
}
getGraph(){
  this.api.getGrpahicalCurrencyData(this.coinId,'EUR',this.days)
  .subscribe(res => {
    setTimeout(() => {
      this.myLineChart.chart?.update();
    }, 200);
   this.lineChartData.datasets[0].data = res.prices.map((el:any)=>{
    return el[1];
   })
   this.lineChartData.labels = res.prices.map((el:any) => {
    let date = new Date(el[0]);
    let time = date.getHours() > 12 ?
      `${date.getHours() - 12} : ${date.getMinutes()} PM ` :
      `${date.getHours()} : ${date.getMinutes()} AM `
    return this.days === 1 ? time : date.toLocaleDateString();

   })
  })
}
updateProva(value: number) {
  this.days = value;
  setTimeout(() => {
    this.getGraph();
  }, 0);
}
}
