import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-green-decision',
  templateUrl: './green-decision.component.html',
  styleUrls: ['./green-decision.component.css']
})
export class GreenDecisionComponent implements OnInit {
  date: Date = new Date();
  contractId = jwt_decode(localStorage.getItem('contractId')!);

  constructor() { }

  ngOnInit(): void {
  }

  onClickPrint(){

  }

}
