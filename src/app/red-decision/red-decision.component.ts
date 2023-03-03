import { Component, OnInit } from '@angular/core';
import {PersonalDataService} from "../Services/personal-data-service";

@Component({
  selector: 'app-red-decision',
  templateUrl: './red-decision.component.html',
  styleUrls: ['./red-decision.component.css']
})
export class RedDecisionComponent implements OnInit {
  decisionReason: string = '';

  constructor(private personalDataService: PersonalDataService) { }

  ngOnInit(): void {
    this.decisionReason = this.personalDataService.esDecision.split(',')[1];
  }

}
