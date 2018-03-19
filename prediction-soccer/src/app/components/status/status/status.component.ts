import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from '../../../services/custom-http.service';
import { AlertNotificationService } from '../../../services/alert-notification.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  status = [];
  constructor(private customHttp: CustomHttpService,
    private alertNotification: AlertNotificationService) { }

  ngOnInit() {
    this.getStatus();
  }

  getStatus() {
    this.customHttp.get('status')
      .subscribe(
        data => { this.status = data.status; },
        error => {
          console.error(error);
          this.alertNotification.error('Ha ocurrido un error al consultar los datos', true);
        }
      );
  }

  delete(id: string, index: number) {
    if (index !== -1) {
      this.status.splice(index, 1);
    }
    this.customHttp.delete(`status/${id}`)
      .subscribe(
        data => { console.log(data); },
        error => {
          console.error(error);
          this.alertNotification.error('Ha ocurrido un error al consultar los datos', true);
        }
      );
  }
}
