import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Tour} from "../shared/tour";
import {TourService} from '../service/tour.service';

import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {switchMap} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Comment} from "../shared/comment";
import {MatSliderChange} from "@angular/material/slider";
import {expand, visibility} from "../animations/app.animations";

@Component({
  selector: 'app-dishdetail',
  templateUrl: './tourdetail.component.html',
  styleUrls: ['./tourdetail.component.scss'],
  animations: [
    visibility(),
    expand()
  ]
})
export class TourdetailComponent implements OnInit {

  tour: Tour | undefined;
  tourcopy: Tour | undefined;
  errMess: string | undefined;
  tourIds: string[] | any;
  prev: string | undefined;
  next: string | undefined;
  visibility = 'shown';

  rating: any = 5;
  commentForm: FormGroup;
  comment: Comment | undefined;
  @ViewChild('fform')
  commentFormDirective: any;

  formErrors: any = {
    "rating": "",
    "comment": "",
    "author": ""
  };

  validationMessages: any = {
    "comment": {
      'required': 'Comment is required.',
    },
    "author": {
      'required': 'Author is required.',
      'minlength': 'Author must be at least 2 characters long.'
    }
  }

  constructor(private tourservice: TourService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              @Inject('BaseURL') public baseURL: any) {
    this.commentForm = this.fb.group({
      rating: [5,],
      comment: ['', Validators.required],
      author: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();//reset form validation messages

  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    console.log(this.comment);
    if (this.comment != undefined) {
      const d = new Date();
      this.comment.date = d.toISOString();
      this.tourcopy?.comments?.push(this.comment);
      this.tourservice.putTour(this.tourcopy)
        .subscribe(dish => {
            this.tour = dish;
            this.tourcopy = dish;
          },
          errmess => {
            this.tour = undefined;
            this.tourcopy = undefined;
            this.errMess = <any>errmess;
          });
    }
    this.commentFormDirective.resetForm();
    this.rating = 5;
    this.commentForm.reset({
      rating: 5,
      comment: '',
      author: ''
    });
  }

  updateSliderValue(event: MatSliderChange) {
    this.commentForm.value["rating"] = event.value;
  }

  ngOnInit() {
    this.tourservice.getTourIds()
      .subscribe(value => this.tourIds = value);

    this.route.params.pipe(switchMap((params: Params) => {
      this.visibility = 'hidden';
      return this.tourservice.getTour(+params['id']);
    }))
      .subscribe(dish => {
          this.tour = dish;
          this.tourcopy = dish;
          this.setPrevNext(dish.id);
          this.visibility = 'shown';
        },
        errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: string | any) {
    const index = this.tourIds?.indexOf(dishId);
    this.prev = this.tourIds[(this.tourIds?.length + index - 1) % this.tourIds?.length];
    this.next = this.tourIds[(this.tourIds?.length + index + 1) % this.tourIds?.length];
  }

  goBack(): void {
    this.location.back();
  }
}
