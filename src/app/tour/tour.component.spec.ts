import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { TourComponent } from './tour.component';
import { RouterTestingModule } from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Tour } from '../shared/tour';
import { TourService } from '../service/tour.service';
import { TOURS } from '../shared/TOURS';
import { baseURL } from '../shared/baseurl';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('TourComponent', () => {
  let component: TourComponent;
  let fixture: ComponentFixture<TourComponent>;

  beforeEach(async(() => {

    const tourServiceStub = {
      getTours: function(): Observable<Tour[]> {
        return of(TOURS);
      }
    };

    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule,
        FlexLayoutModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        RouterTestingModule.withRoutes([{ path: 'tour', component: TourComponent }])
      ],
      declarations: [ TourComponent ],
      providers: [
        { provide: TourService, useValue: tourServiceStub },
        { provide: 'baseURL', useValue: baseURL },
      ]
    })
      .compileComponents();

    const tourservice = TestBed.get(TourService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tours items should be 4', () => {
    expect(component?.tours?.length).toBe(4);
    expect(component?.tours ? component?.tours[1].name : undefined ).toBe('Zucchipakoda');
    expect(component?.tours ? component?.tours[3].featured : undefined).toBeFalsy();
  });

  it('should use tours in the template', () => {
    fixture.detectChanges();

    let de:      DebugElement;
    let el:      HTMLElement;
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;

    expect(el.textContent).toContain(TOURS[0].name?.toUpperCase());
  });

});
