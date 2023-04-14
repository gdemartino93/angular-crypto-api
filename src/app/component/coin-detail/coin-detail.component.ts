import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
//lib grafici
import { ChartConfiguration, ChartType} from 'chart.js'
import { BaseChartDirective} from 'ng2-charts'
import { log } from 'console';
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
        label: `Price Trends`,
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
  days? : number;

  constructor(private api : ApiService,private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(el =>{
      this.coinId = el['id'];
    })
    this.getSingleCoin();
    this.getGraph();
  }
getSingleCoin(){
  this.api.getCurrencyById(this.coinId)
    .subscribe(res => {
      this.coinData = res;
      console.log(this.coinData)
    })
}
getGraph(){
  this.api.getGrpahicalCurrencyData(this.coinId,'EUR',1)
  .subscribe(res => {
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
}
