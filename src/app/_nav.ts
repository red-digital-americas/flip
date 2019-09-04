import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MenuService {  

  private flipWeb = [ 
    { 
      name: 'Index', url: '/webadmin/webadmin', icon: 'icon-drop',
      children: [  
        { name: 'Index', url: '/webadmin/webadmin', icon: 'icon-drop'}, 
        { name: 'Desgin Index', url: '/webadmin/designindex', icon: 'icon-drop'}, 
        { name: 'More Index', url: '/webadmin/moreindex', icon: 'icon-drop' },
        { name: 'Home Index', url: '/webadmin/homeindex', icon: 'icon-drop'}
      ]
    },  
    {
      name: 'Home', type: 1, url: '/webadmin/homemenu', icon: 'icon-puzzle', 
      children: [  
        // { name: 'Home Services', url: '/webadmin/homeservices', icon: 'icon-drop' },
        // { name: 'Home Ammenities', url: '/webadmin/homeammenities', icon: 'icon-drop' },
        // { name: 'Home General', url: '/webadmin/homegeneral', icon: 'icon-drop' },
        { name: 'Home Menu', url: '/webadmin/homemenu', icon: 'icon-drop' },
      ]
    },
    { name: 'Design', type: 1, url:'/webadmin/design', icon: 'icon-cursor' },
    {
      name: 'More', type: 1, url: '/', icon: 'icon-cursor',
      children: [  
        { name: 'Team', url: '/webadmin/team', icon: 'icon-cursor' },
        { name: 'Jobs', url: '/webadmin/jobs', icon: 'icon-cursor' },
        { name: 'Press', url: '/webadmin/press', icon: 'icon-cursor'}
      ]
    }
  ] 

  private adminApp = [
    { name: 'Communities', url: '/communities', icon: 'icon-drop' }, 
    // { name: 'Users', url: '/users', icon: 'icon-drop'}
  ] 

  private booking = [
    { name: 'Communities', url: '/communities', icon: 'icon-drop' }
  ]

  public CreateMenu(sectionId:number) {
    if (sectionId == 1) { return this.flipWeb;}
    if (sectionId == 2) { return this.adminApp;}
    if (sectionId == 3) { return this.booking;}
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  private navSections = [
    {id:1, name: 'Flip Web', url: '/webadmin', permisos: [1, 4]},
    {id:2, name: 'Admin App', url: '/communities', permisos: [2, 4]},
    {id:3, name: 'Booking', url: '/communities', permisos: [3, 4]},
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