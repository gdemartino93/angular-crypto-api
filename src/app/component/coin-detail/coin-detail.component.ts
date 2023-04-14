import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
//lib grafici
import { ChartConfiguration, ChartType} from 'chart.js'
import { BaseChartDirective} from 'ng2-charts'
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
