import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
    public user = new User('','','','')
    public message!:string
    public isError:boolean = false
    public isSuccess:boolean = false

    constructor(private _us:UserService){}
  onSubmitForm(){
    this._us.registerUser(this.user).subscribe(response=>{
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
