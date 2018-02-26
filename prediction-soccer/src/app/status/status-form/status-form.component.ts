import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AlertNotificationService } from '../../services/alert-notification.service';
import { CustomHttpService } from '../../services/custom-http.service';

import { Status } from '../../models/status';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.css']
})
export class StatusFormComponent implements OnInit {

  model: Status = new Status();
  id: string;

  constructor(private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private customHttp: CustomHttpService,
    private alertNotification: AlertNotificationService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.getStatusById(this.id);
      }
    });
  }

  getStatusById(id: string) {
    this.customHttp.get(`status/${id}`)
      .subscribe(
        data => { this.model = data.status; },
        error => {
          console.error(error);
          this.alertNotification.error('Ha ocurrido un error al consultar los datos', true);
        }
      );
  }

  save() {
    let result: any;
    if (this.id) {
      result = this.customHttp.put(`status/${this.id}`, this.model);
    }
    else {
      result = this.customHttp.post('status', this.model);
    }

    result.subscribe(
      () => {
        this.alertNotification.success('Registro exitoso', true);
        this.router.navigate(['/status']);
      },
      error => {
        this.alertNotification.error(<any>error, true);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  f: NgForm;
  @ViewChild('f') currentForm: NgForm;

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.f) { return; }
    this.f = this.currentForm;
    if (this.f) {
      this.f.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.f) { return; }
    const form = this.f.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'name': ''
  };

  validationMessages = {
    'name': {
      'required': 'Este campo es requerido.',
      'minlength': 'Debe tener un minimo de 5 caracteres.',
      'maxlength': 'Debe tener un maxímo de 100 caracteres.',
    }
  };
}
