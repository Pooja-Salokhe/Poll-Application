import { Component, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { _ } from 'lodash';

@Component({
  selector: 'app-view-chart',
  templateUrl: './view-chart.component.html',
  styleUrls: ['./view-chart.component.css'],
})
export class ViewChartComponent implements OnChanges {

  @Input() chartData: any;
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [{
        stacked: false,
        ticks: {
          stepSize: 1,
          min: 0,
          maxRotation: 45,
          minRotation: 45,
          autoSkip: false
        }
      }]

    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  totalVotes = 0;

  public barChartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];

  constructor() { }

  ngOnChanges() {
    this.update();
  }

  /**
   * This function will update the bar chart content.
   */
  update() {
    const votesCount = [];
    this.totalVotes = 0;
    this.barChartLabels = [];
    this.chartData[this.chartData.length - 1].options.forEach(element => {
      this.barChartLabels.push(element.option);
      votesCount.push(element.votes);
      this.totalVotes += element.votes;
    });
    this.barChartData[0].data = votesCount;
    this.barChartData[0].label = this.chartData[this.chartData.length - 1].question;


  }
}
