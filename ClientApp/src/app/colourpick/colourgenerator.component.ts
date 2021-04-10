import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ColourService } from '../../../services/ColourService';
import * as $ from 'jquery';
import * as Chart from 'chart.js';

import { forEachChild } from 'typescript';
@Component({
  selector: 'color-generator',
  templateUrl: './colourgenerator.component.html'
})
export class ColourGeneratorComponent implements OnInit, AfterViewInit {
  private colourPickerService: ColourService;
  private currentColourUsageAry: string[];

  private data: any;
  private config: any;
  private canvas: any;
  private chart: Chart;
  private graphColourCtx: any;
  private dataProportions: number[];

  @ViewChild('coloursToUse', { static: false })
  coloursToUse: ElementRef;
  @ViewChild('colorGraph', { static: false })
  colourGraph: ElementRef;
  constructor(colourPickerService: ColourService) {
    this.colourPickerService = colourPickerService;
  }

  public btnAddColourToChart():void {
    let clr = this.coloursToUse.nativeElement.value;
    this.currentColourUsageAry.push(clr);
    this.dataProportions.push(10);
    this.chart.update();
    //this.colourGraph.nativeElement;
  }

  ngOnInit(): void {
    this.currentColourUsageAry = [];
    this.dataProportions = [];
  }

  ngAfterViewInit(): void {
    let coloursToDisplay = this.colourPickerService.ColourGenDataSet.ColoursToDisplay;
    if (this.coloursToUse.nativeElement.hasChildNodes)
      this.coloursToUse.nativeElement.childNodes.forEach((c, k, p) => {
        this.coloursToUse.nativeElement.removeChild(c);
      });
    for (let n = 0; n < coloursToDisplay.length; n++) {
      let opt = document.createElement('option');
      opt.text = coloursToDisplay[n];
      opt.value = coloursToDisplay[n];

      this.coloursToUse.nativeElement.append(opt);
    }
    this.data = {
      labels: this.currentColourUsageAry,
      datasets: [{
        label: 'Init Data Set',
        data: this.dataProportions,
        backgroundColor: this.currentColourUsageAry,
        hoverOffset: 4
      }]
    };

    this.config = {
      type: this.colourPickerService.ColourGenDataSet.GraphType,
      data: this.data,
      responsive: true
    };

    this.canvas = document.getElementById('colourGraph');
    this.graphColourCtx = this.canvas.getContext('2d');
    this.chart = new Chart(this.graphColourCtx, this.config);
    let itmChart: Chart = this.chart;
    let clickableSections = this.currentColourUsageAry;
    $(this.canvas).click(function (evt) {

      let points: any[] = itmChart.getElementsAtEvent(evt);
      if (points && points.length > 0) {
        alert("You picked: " + clickableSections[points[0]["_index"]]);
      }
    });
  }
}
