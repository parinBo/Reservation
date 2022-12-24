import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { ReservationService } from './services/reservation.service';
import { UIService } from './shared/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'reservation';
  loading = false;
  constructor(){}

  ngOnInit(): void {
    UIService.getLoading().subscribe(data => this.loading = data);
  }


}
