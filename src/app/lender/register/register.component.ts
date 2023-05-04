import { Component } from '@angular/core';
import { Lender } from 'src/app/lender';
import { LenderService } from 'src/app/lender.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public lender = new Lender('','','','','')
  public message!:string
  public isError:boolean = false
  public isSuccess:boolean = false

  constructor(private _lenderservice:LenderService){}


  onSubmitForm(){
    this._lenderservice.registerLender(this.lender).subscribe(response=>{
      // console.log(response)
      this.message = response.message
      this.isSuccess = true;
      this.isError = false
    },err=>{
      // console.log(err)
      this.message = err.error.message;
      this.isError = true;
      this.isSuccess = false;
    })
  }
}
