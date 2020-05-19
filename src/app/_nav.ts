import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MenuService {  

  private flipWeb = [ 
    { 
      name: 'Main', url: '/webadmin/webadmin', icon: 'icon-globe',
      children: [  
        { name: 'Index', url: '/webadmin/webadmin', icon: 'icon-docs sangria'}, 
        { name: 'Desgin Index', url: '/webadmin/designindex', icon: 'icon-tag sangria'}, 
        { name: 'More Index', url: '/webadmin/moreindex', icon: 'icon-book-open sangria' },
        { name: 'Communities Index', url: '/webadmin/homeindex/1', icon: 'icon-globe-alt sangria'}
      ]
    },  
    {
      name: 'Communities', type: 1, url: '/webadmin/homemenu', icon: 'icon-home', 
      children: [  
        // { name: 'Home Services', url: '/webadmin/homeservices', icon: 'icon-drop' },
        // { name: 'Home Ammenities', url: '/webadmin/homeammenities', icon: 'icon-drop' },
        // { name: 'Home General', url: '/webadmin/homegeneral', icon: 'icon-drop' },
        { name: 'Builds', url: '/webadmin/homemenu', icon: 'icon-docs sangria' },
      ]
    },
    { name: 'Design', type: 1, url: '/webadmin/design', icon: 'icon-grid' },
    {
      name: 'More', type: 1, url: '/', icon: 'icon-plus reduce',
      children: [  
        { name: 'Team', url: '/webadmin/team', icon: 'icon-people sangria'},
        { name: 'Jobs', url: '/webadmin/jobs', icon: 'icon-wrench sangria'},
        { name: 'Press', url: '/webadmin/press', icon: 'icon-bubbles sangria'}
      ]
    },
    {
      name: 'Backstage', type: 1, url: '/', icon: 'icon-organization reduce',
      children: [  
        { name: 'Index', url: '/backstage', icon: 'icon-globe sangria'},
        { name: 'What is Colving', url: '/coliving', icon: 'icon-book-open sangria'},
        { name: 'Memberships', url: '/memberships', icon: 'icon-people sangria'}
      ]
    }
  ] 

  private adminApp = [
    { name: 'Communities', url: '/communities', icon: 'icon-drop' }, 
    // { name: 'Users', url: '/users', icon: 'icon-drop'}
  ] 

  private booking = [
    { name: 'Booking', url: '/booking', icon: 'icon-screen-tablet' },
    { name: 'General TenanList', url: '/generalTenantlist', icon: 'icon-list' },
    { name: 'Add Tenant', url: '/AddTenant', icon: 'icon-user-follow' },
    { name: 'Users', url: '/Users', icon: 'icon-people' },
    { name: 'Roles', url: '/Roles', icon: 'icon-settings' }
  ]

  public CreateMenu(sectionId:number) {
    if (sectionId == 1) { return this.flipWeb;}
    if (sectionId == 2) { return this.adminApp;}
    if (sectionId == 3) { return this.booking;}
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  private navSections = [
    {id:1, name: 'Web Content Manager', url: '/webadmin', permisos: [1, 4]},
    {id:2, name: 'App Content Manager', url: '/communities', permisos: [2, 4]},
    {id:3, name: 'Building Operation', url: '/booking', permisos: [3, 4]},
  ]

  public CreateNavSections(systemType:number) {
    let sections = [];

    this.navSections.filter(r => r.permisos.includes(systemType)).forEach(r => {      
      sections.push({ id: r.id, name: r.name, url: r.url});
    })
    return sections;
  }

  public GetFirstURLSection(systemType:number) {
    return this.navSections.filter(r => r.permisos.includes(systemType))[0].url;
  }

}
