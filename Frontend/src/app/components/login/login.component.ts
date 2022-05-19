import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { ApiServicesService } from '../../services/api-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required])
  })
  public err_status : boolean = true;
  public msg        : string = "";

  constructor(private router: Router, private apis : ApiServicesService) { }

  ngOnInit(): void {
  }
  /*
    get form errors
  */
  get formControls(){
    return this.loginForm.controls;
  }
  onLogin(){    
    let payload = {'email':this.loginForm.value.username,'password':this.loginForm.value.password}
    this.apis.sendPostRequest('signin',payload).subscribe((result) => {      
      if(result.status === false){
        this.msg = result.error;
      }else{
        this.msg = "";
        if(result.data.token.idToken != "" && result.data.token.idToken != undefined && result.data.token.idToken != null){
          this.apis.saveLocalItems(result.data.token.idToken,result.data.exp,result.data.email)
          this.router.navigate(["/patient-information"]);
        }else{
          this.msg = "Something went Wrong!..";
        }
  
      }       
    })
  }

}
