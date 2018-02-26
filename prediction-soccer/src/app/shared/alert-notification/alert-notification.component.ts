import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertNotificationService } from '../../services/alert-notification.service';

@Component({
  selector: 'app-alert-notification',
  templateUrl: './alert-notification.component.html',
  styleUrls: ['./alert-notification.component.css']
})
export class AlertNotificationComponent implements OnInit, OnDestroy {

  message = '';
  private sub: any;

  constructor(private alertNotification: AlertNotificationService) { }

  ngOnInit() {
    this.sub = this.alertNotification.getMessage()
      .subscribe(message => {
        this.message = message;
        setTimeout(() => {
          this.message = '';
        }, 10000);
      });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
