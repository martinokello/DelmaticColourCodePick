import { Injectable } from "@angular/core";

@Injectable()
export class ColourService {
  public ColourGenDataSet: IColourDataSet;

  public constructor() {
    this.ColourGenDataSet = {
      ColoursToDisplay: ['red', 'green', 'blue', 'orange', 'yellow', 'brown', 'white', 'pink', 'gold', 'purple'],
      GraphType:'doughnut'
    }
  }

}

export interface IColourDataSet {
  ColoursToDisplay: string[],
  GraphType: string
}

