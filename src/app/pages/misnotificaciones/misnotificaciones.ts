import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Notificacionservice } from '../../services/notificacionservice';

@Component({
  selector: 'app-misnotificaciones',
  imports: [BaseChartDirective,MatIconModule],
  templateUrl: './misnotificaciones.html',
  styleUrl: './misnotificaciones.css',
})
export class Misnotificaciones {
    hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];

  constructor(private nS: Notificacionservice) {}

  ngOnInit(): void {
    this.nS.getUsuarios().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.barChartLabels = data.map((item) => item.usuario);
        this.barChartData=[
          {
            data:data.map(item=>item.total),
            label:'Cantidad total de notificaciones por usuario',
            backgroundColor:[
              '#75ddfcff',
              '#aeacf7ff',
              'rgba(252, 157, 117, 1)'
            ]
          }
        ]
      } else {
        this.hasData = false;
      }
    });
  }

}
