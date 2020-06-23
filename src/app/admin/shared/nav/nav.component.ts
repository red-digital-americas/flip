import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']  
})

export class NavComponent implements OnInit {

  @Input() public section:string;

  public community_name:string;

  IDBUILD:number;
  navRoutes = [
    {title: "Newsfeed", route: "/newsfeed", selector: 'newsfeed', active: false}, 
    // {title: "Activities", route: "/activities"}, 
    {title: "Amenities", route: "/amenities", selector: 'amenities', active: false}, 
    //{title: "Reservations", route: "/reservations", selector: 'reservations', active: false},
    {title: "Perks", route: "/perks", selector: 'perks', active: false},
    {title: "Services", route: "/services", selector: 'services', active: false},
    //{title: "Messages", route:"/chat", selector: 'chat', active: false}
    {title: "Maps", route: "/maps", selector: 'maps', active: false},
  ]
  
  constructor(  public router: Router, public route: ActivatedRoute,                           
  ) { }

  ngOnInit() {
    this.IDBUILD = this.route.snapshot.params['id'];  

    this.navRoutes.forEach( (tab:any) => {

      this.section === tab.selector ? 
        tab.active = true : tab.active = false;

    });   

    this.addNameSection();

  }
  
  public addNameSection():void {

    const section_name = sessionStorage.getItem('community_select');

    section_name == null || section_name == undefined ? 
      this.router.navigateByUrl('/communities') :
      this.community_name = section_name;

  }

  public goTo( to_where:string ):void {

    this.router.navigateByUrl( to_where );

  }

}


