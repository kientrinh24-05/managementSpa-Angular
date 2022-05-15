import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/lib/base-component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  public chartData: Object;
  public xAxis: Object;
  public yAxis: Object;
  public legend: Object;
  public legendSettings: Object;
  public tooltip: Object;
  public chartTitle: string;
  public marker: Object;

  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);

    this.tooltip = {
      enable: true
    }
    this.chartTitle = "Thống kê doanh thu theo tháng";
    this.marker = {
      visible: true,
      dataLabel: {
        visible: true
      }
    };
    this.legendSettings = {
      visible: true
    };

    // this.chartData = [
    //   { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
    //   { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
    //   { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
    //   { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
    //   { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
    //   { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
    // ];

    this.legend = {
      visible: true
    }
    this.xAxis = {
      valueType: 'Category',
      title: 'Month'
    };
    this.yAxis = {
      title: 'Price'
    }
  }

  getStatisBook () {
    this._api.get('/api/v1/booking/booking_statistical').subscribe(res => {
      // this.chartData = res.data;
      
    }
    )}

  ngOnInit(): void {
    this.getStatisBook();
  }



}
