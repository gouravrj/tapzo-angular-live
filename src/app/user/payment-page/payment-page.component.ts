import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BikeService } from 'src/app/bike.service';
import { History } from 'src/app/history';
import { HistoryService } from 'src/app/history.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit{

  public history = new History('','','','','','','')
  public price!:string
  public cid!:string
  public bikeid!:string
  public lenderid!:string
  public flag:boolean = false
  public todayDate!:Date
  public booked:boolean = false
  public dropdown:boolean = true

  public amt!:number

  constructor(private _acroute:ActivatedRoute,private _hs:HistoryService,private _bs:BikeService){}

  ngOnInit(): void {
    this.price = this._acroute.snapshot.paramMap.get('price') as string
    this.bikeid = this._acroute.snapshot.paramMap.get('bikeid') as string
    this.lenderid = this._acroute.snapshot.paramMap.get('lid') as string
    console.log(this.todayDate)
    this.cid = localStorage.getItem('userID') as string

  }

  temp!:number
  onPay(days:any){
    this.todayDate = new Date();

    this.history.bid = this.bikeid
    this.history.lid = this.lenderid
    this.history.uid = this.cid
    this.history.day = days
    this.history.cost = this.amt as unknown as string
    this.history.iscomp = "false"
    this.history.date = this.todayDate as unknown as string

    this._hs.registerHistory(this.history).subscribe(
      rs=>console.log(rs),
      err=>console.log(err)
    )
    this.booked = true;
    this.flag = false;
    this.dropdown = false

    this._bs.decrementAvaibilty(this.bikeid)
  }

  onChange(days:any){
    this.flag = true
    this.temp = this.price as unknown as number
    this.amt = days*this.temp
    console.log(this.amt)
  }
}
