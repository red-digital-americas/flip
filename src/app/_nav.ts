import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MenuService {  

  private flipWeb = [ 
    { 
      name: 'Main', url: '/webadmin/webadmin', icon: 'icon-globe',
      children: [  
        { name: 'Main Index', url: '/webadmin/webadmin', icon: 'icon-docs sangria'}, 
        { name: 'Design index', url: '/webadmin/designindex', icon: 'icon-tag sangria'}, 
        { name: 'More Index', url: '/webadmin/moreindex', icon: 'icon-book-open sangria' },
        { name: 'Builds Index', url: '/webadmin/homeindex/1', icon: 'icon-globe-alt sangria'}
      ]
    },  
    //{
      //name: 'Communities', type: 1, url: '/webadmin/homemenu', icon: 'icon-home', 
      //children: [  
        // { name: 'Home Services', url: '/webadmin/homeservices', icon: 'icon-drop' },
        // { name: 'Home Ammenities', url: '/webadmin/homeammenities', icon: 'icon-drop' },
        // { name: 'Home General', url: '/webadmin/homegeneral', icon: 'icon-drop' },
    { name: 'Builds', type: 1, url: '/webadmin/homemenu', icon: 'icon-docs' },
      //]
    //},
    { name: 'Design', type: 1, url: '/webadmin/design', icon: 'icon-grid' },
    {
      name: 'More', type: 1, url: '/', icon: 'icon-plus reduce',
      children: [  
        { name: 'Team', url: '/webadmin/team', icon: 'icon-people sangria'},
        { name: 'Carrers', url: '/webadmin/jobs', icon: 'icon-wrench sangria'},
        { name: 'Press', url: '/webadmin/press', icon: 'icon-bubbles sangria'}
      ]
    },
    {
      name: 'Backstage', type: 1, url: '/', icon: 'icon-organization reduce',
      children: [  
        { name: 'Index', url: '/backstage', icon: 'icon-globe sangria'},
        { name: 'What is Colving', url: '/coliving', icon: 'icon-book-open sangria'},
        { name: 'Memberships', url: '/memberships', icon: 'icon-people sangria'},
        { name: 'Flip Network', url: '/flipNetwork', icon: 'icon-globe-alt sangria'}
      ]
    }
  ] 

  private adminApp = [
    { name: 'Communities', url: '/communities', icon: 'cui-dashboard' }
  ] 

  private booking = [
    { id: 1, name: 'Booking', url: '/booking', icon: 'icon-screen-tablet' },
    { id: 2, name: 'General TenanList', url: '/generalTenantlist', icon: 'icon-list' },
    { id: 3, name: 'Add Tenant', url: '/AddTenant', icon: 'icon-user-follow' },
    { id: 4, name: 'Users Admin', url: '/Users', icon: 'icon-people' },
    // { name: 'Roles', url: '/Roles', icon: 'icon-settings' }
  ]

  permissionBooking;

  public CreateMenu(sectionId:number) {
    this.permissionBooking = JSON.parse(localStorage.getItem('user')).userPermissions;
    console.log(this.permissionBooking);
    var grantBooking = [];
    this.permissionBooking.forEach(element => {
      let i = this.booking.find(x => x.id === element.permissionId);
      grantBooking.push(i);
    });
    console.log(grantBooking);
    if (sectionId == 1) { return this.flipWeb;}
    if (sectionId == 2) { return this.adminApp;}
    if (sectionId == 3) { return grantBooking;}
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  private navSections = [
    {id:1, name: 'Web Manager', url: '/webadmin', permisos: [1, 4]},
    // {id:2, name: 'App Content Manager', url: '/communities', permisos: [4, 5]},
    {id:3, name: 'Building Operation', url: '/booking', permisos: [3, 4]},
  ]

  public CreateNavSections(systemType:number) {
    let sections = [];

    this.navSections.filter(r => r.permisos.includes(systemType)).forEach(r => {
      sections.push({ id: r.id, name: r.name, url: r.url});
    });
    // console.log('Sections', sections);
    return sections;
  }

  public GetFirstURLSection(systemType:number) {
    // console.log('System type', systemType);
    // console.log('First URL', this.navSections.filter(r => r.permisos.includes(systemType))[0].url);
    return this.navSections.filter(r => r.permisos.includes(systemType))[0].url;
  }

}
