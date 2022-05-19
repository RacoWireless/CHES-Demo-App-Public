import { Component } from '@angular/core';
import { ApiServicesService } from './services/api-services.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kore-demo-ui';
  constructor(private apis : ApiServicesService){}
  ngOnInit() {
    this.apis.autoAuthUser();
  }
}
