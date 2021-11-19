import {Component, Inject, OnInit} from '@angular/core';
import {Tour} from '../shared/tour';
import {TourService} from "../service/tour.service";
import {expand, flyInOut} from "../animations/app.animations";

@Component({
  selector: 'app-menu',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class TourComponent implements OnInit {

  tours: Tour[] | undefined;

  selectedTour: Tour | undefined;
  errMess: string | undefined;

  constructor(private tourService: TourService,
              @Inject('BaseURL') public baseURL: any) {
  }

  ngOnInit(): void {
    this.tourService.getTours()
      .subscribe(dishes => this.tours = dishes,
        errmess => this.errMess = <any>errmess);
  }

  onSelect(dish: Tour) {
    this.selectedTour = dish;
  }
}
