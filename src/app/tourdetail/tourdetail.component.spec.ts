import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourdetailComponent } from './tourdetail.component';

describe('TourdetailComponent', () => {
  let component: TourdetailComponent;
  let fixture: ComponentFixture<TourdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
