import {Routes} from "@angular/router";

import {TourComponent} from '../tour/tour.component';
import {TourdetailComponent} from '../tourdetail/tourdetail.component';
import {HomeComponent} from '../home/home.component';
import {AboutComponent} from '../about/about.component';
import {ContactComponent} from '../contact/contact.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'tour', component: TourComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'aboutus', component: AboutComponent},
  {path: 'tourdetail/:id', component: TourdetailComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
]
