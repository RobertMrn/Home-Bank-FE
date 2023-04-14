import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import {PrintService} from "../Services/print-service";

@Component({
  selector: 'app-green-decision',
  templateUrl: './green-decision.component.html',
  styleUrls: ['./green-decision.component.css']
})
export class GreenDecisionComponent implements OnInit {
  date: Date = new Date();
  contractId = jwt_decode(localStorage.getItem('contractId')!);

  constructor(private printService: PrintService) { }

  ngOnInit(): void {
  }

  onClickPrint(){
    this.printService.getContractPrinted().subscribe({
      next: value => {
        window.open(URL.createObjectURL(value));
      },
      error: err => {
        window.open(err);
      }
    })
  }

}
