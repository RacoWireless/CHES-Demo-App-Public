import { Component, OnInit } from '@angular/core';
import { commonclass } from '../../../../common/common';
import { ApiServicesService } from '../../../../services/api-services.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public username : string = "";
  public email : string = "";
  constructor(private apis:ApiServicesService , private msgs : commonclass) { }

  ngOnInit(): void {
    this.msgs.showLoader('start');
    this.email = localStorage.getItem('email') || "";
    this.username = this.email.substring(0, this.email.lastIndexOf("@"));
    this.msgs.showLoader('stop');
  }

  logout(){
    this.apis.logout();
  }
  togglesidebar(){
    // const element = document.getElementById("appcontainer");
    // element.classList.toggle("appcontainer");   

    document.getElementsByClassName('appcontainer')[0].classList.toggle('collapsed')
  }

  progfiletoggle(){
    document.getElementsByClassName('userpopover')[0].classList.toggle('active')
  }

}
