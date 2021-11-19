import {Injectable} from '@angular/core';
import {Tour} from "../shared/tour";
import {Observable} from "rxjs";
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {ProcessHTTPMsgService} from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) {
  }

  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(baseURL + 'tours')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getTour(id: number): Observable<Tour> {
    return this.http.get<Tour>(baseURL + 'tours/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedTour(): Observable<Tour> {
    return this.http.get<Tour[]>(baseURL + 'tours?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getTourIds(): Observable<number[] | any> {
    return this.getTours().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }

  putTour(tour: Tour | any): Observable<Tour> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Tour>(baseURL + 'tours/' + tour.id, tour, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
