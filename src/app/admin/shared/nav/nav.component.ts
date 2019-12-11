import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']  
})

export class NavComponent implements OnInit {

  IDBUILD:number;
  navRoutes = [
    {title: "Newsfeed", route: "/newsfeed"}, 
    // {title: "Activities", route: "/activities"}, 
    {title: "Amenities", route: "/amenities"}, 
    {title: "Reservations", route: "/reservations"},
    {title: "Perks", route: "/perks"},
    {title: "Services", route: "/services"},
    {title: "Messages", route:"/chat"}
  ]
  
  constructor(  private router: Router, private route: ActivatedRoute,                           
  ) { }

  ngOnInit() {
    this.IDBUILD = this.route.snapshot.params['id'];      
  }        

}


