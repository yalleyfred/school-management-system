import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sms-column-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './column-chart.component.html',
  styleUrl: './column-chart.component.css',
})
export class ColumnChartComponent implements OnInit, AfterViewInit {
  @ViewChild('svg') svg!: ElementRef;
  private svgHeight = 0;
  private largestValue = 0;
  private data: { [key: string]: number } = {
    boys: 10,
    girls: 20,
    teachers: 30,
  };
  public barWidth = 50;
  public svgGap = 50;
  public heights = signal<number[]>([]);
  public yValues = signal<number[]>([]);
  public xValues = signal<number[]>([]);
  public keys = signal<string[]>([]);
  public colors=['#445569','bisque']

  public ngOnInit(): void {
    this.getDataValues();
  }

  private getDataValues(): void {
    this.keys.set(Object.keys(this.data));
    this.heights.set(Object.values(this.data));
    this.yValues.set(Object.values(this.data));
    this.yValues.set(Array(Object.values(this.data).length).fill(0));
    this.largestValue = Math.max(...this.heights());
  }

  public ngAfterViewInit(): void {
    this.svgHeight = this.svg.nativeElement.clientHeight;
    this.heights.set(
      this.heights().map(
        (height) => (height / this.largestValue) * this.svgHeight - 50,
      ),
    );
    this.yValues.set(this.heights().map((height) => this.getY(height)));
    this.xValues.set(this.heights().map((_, index) => this.getX(index)));
  }

  private getY(height: number): number {
    return this.svgHeight - height;
  }

  private getX(index: number): number {
    return this.svgGap + (this.barWidth + this.svgGap) * index;
  }
}
