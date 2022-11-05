import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-home-customers',
  templateUrl: './home-customers.component.html',
  styleUrls: ['./home-customers.component.css']
})
export class HomeCustomersComponent implements OnInit {

  constructor(private observer: BreakpointObserver) { }

  @ViewChild(MatSidenav)
  sidenav!:MatSidenav;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px']).subscribe((res)=>{
      if(res.matches){
        this.sidenav.mode='over';
        this.sidenav.close();
      }else{
        this.sidenav.mode='side';
        this.sidenav.open();
      }
    });
  }

}
