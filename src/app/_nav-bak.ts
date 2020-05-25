var permisos = JSON.parse(localStorage.getItem("SystemTypeId"));
var  menu = []; 

/*
var mainRoutes = [
  { 
    name:'Index', url: '/webadmin/webadmin', icon: 'icon-drop', permisos: [1],
    children: [
      { name: 'Index', url: '/webadmin/webadmin', icon: 'icon-drop'}, 
      { name: 'Desgin Index', url: '/webadmin/designindex', icon: 'icon-drop'}, 
      { name: 'More Index', url: '/webadmin/moreindex', icon: 'icon-drop' },
      { name: 'Home Index', url: '/webadmin/homeindex', icon: 'icon-drop'}
    ]
  },
  { 
    name: 'Home', type: 1, url: '/', icon: 'icon-puzzle', permisos: [1],
    children: [  
      { name: 'Home Services', url: '/webadmin/homeservices', icon: 'icon-drop' },
      { name: 'Home Ammenities', url: '/webadmin/homeammenities', icon: 'icon-drop' },
      { name: 'Home General', url: '/webadmin/homegeneral', icon: 'icon-drop' },
      { name: 'Home Room', url: '/webadmin/homeroom', icon: 'icon-drop' },
    ]
  },
  {
    name: 'More', type: 1, url: '/', icon: 'icon-cursor', permisos: [1],
    children: [  
      { name: 'Team', url: '/webadmin/team', icon: 'icon-cursor' },
      { name: 'Jobs', url: '/webadmin/jobs', icon: 'icon-cursor' },
      { name: 'Press', url: '/webadmin/press', icon: 'icon-cursor'}
    ]
  },
  { name:'Index24', url: '/webadmin/webadmin', icon: 'icon-drop', permisos: [1] },
  { name: 'Commutinities', url: '/communities', icon: 'icon-drop', permisos: [2] },
  { name: 'Users', url: '/users', icon: 'icon-drop', permisos: [2] },
  { name: 'Commutinities', url: '/communities', icon: 'icon-drop',permisos: [3] }
]

mainRoutes.filter(r => r.permisos.includes(permisos)).forEach(r => {
  let page;

  if (r['children']) { page = { name: r.name, url: r.url, icon: r.icon, children: []}; } 
  else { page = { name: r.name, url: r.url, icon: r.icon}; }
  
  if (r['children']) {
    r['children'].forEach(c => {
    // r['children'].filter(c => c.permisos.includes(permisos)).forEach(c => {
      let child = { name: c.name, url: c.url, icon: c.icon}
      page.children.push(child);
    })
  }    

  menu.push(page);  
});
*/


if (permisos == 1) {
  menu = [ 
    { 
      name: 'Main Page', url: '/webadmin/webadmin', icon: 'icon-drop',
      children: [  
        { name: 'Homes', url: '/webadmin/webadmin', icon: 'icon-globe'}, 
        { name: 'Desgin Index', url: '/webadmin/designindex', icon: 'icon-drop'}, 
        { name: 'More Index', url: '/webadmin/moreindex', icon: 'icon-book-open' },
        { name: 'Home Index', url: '/webadmin/homeindex', icon: 'icon-globe-alt'}
      ]
    },  
    {
      name: 'Home', type: 1, url: '/webadmin/homemenu', icon: 'icon-puzzle', 
      children: [  
        /*{ name: 'Home Services', url: '/webadmin/homeservices', icon: 'icon-drop' },
        { name: 'Home Ammenities', url: '/webadmin/homeammenities', icon: 'icon-drop' },
        { name: 'Home General', url: '/webadmin/homegeneral', icon: 'icon-drop' },*/
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
} 
else if (permisos == 2 ){
  menu = [
    { name: 'Communities', url: '/communities', icon: 'icon-drop' }, 
    // { name: 'Users', url: '/users', icon: 'icon-drop'}
  ] 
}
else if (permisos == 3){
  menu = [
    { name: 'Communities', url: '/communities', icon: 'icon-drop' }
  ] 
} else if (permisos == 5) {
  menu = [
    { name: 'Communities', url: '/communities', icon: 'icon-drop' }
  ]
}
else {
  menu = [
    { name: 'Dashboard', url: '/dashboard', icon: 'icon-speedometer', badge: { variant: 'info', text: 'NEW' } },
    { title: true, name: 'Theme' },
    { name: 'Colors', url: '/theme/colors', icon: 'icon-drop' },
    { name: 'Typography', url: '/theme/typography', icon: 'icon-pencil' },
    { title: true, name: 'Components' },
    { name: 'Base', type: 1, url: '/base', icon: 'icon-puzzle',
      children: [
        { name: 'Cards', url: '/base/cards', icon: 'icon-puzzle'},
        { name: 'Carousels', url: '/base/carousels', icon: 'icon-puzzle' },
        { name: 'Collapses', url: '/base/collapses', icon: 'icon-puzzle' },
        { name: 'Pagination', url: '/base/paginations', icon: 'icon-puzzle' },
        { name: 'Popovers', url: '/base/popovers', icon: 'icon-puzzle' },
        { name: 'Progress', url: '/base/progress', icon: 'icon-puzzle' },
        { name: 'Switches', url: '/base/switches', icon: 'icon-puzzle' },
        { name: 'Tabs', url: '/base/tabs', icon: 'icon-puzzle' },
        { name: 'Tooltips', url: '/base/tooltips', icon: 'icon-puzzle'}
      ]
    },
    {
      name: 'FLIP', url: '/FlipApp', icon: 'icon-puzzle',
      children: [
        { name: 'Communities', url: '/FlipApp/communities', icon: 'icon-puzzle' },
      ]
    },
    {
      name: 'Buttons', url: '/buttons', icon: 'icon-cursor',
      children: [
        { name: 'Buttons', url: '/buttons/buttons', icon: 'icon-cursor' },
        { name: 'Dropdowns', url: '/buttons/dropdowns', icon: 'icon-cursor' },
        { name: 'Loading Buttons', url: '/buttons/loading-buttons', icon: 'icon-cursor', badge: { variant: 'danger', text: 'PRO' } },
        { name: 'Brand Buttons', url: '/buttons/brand-buttons', icon: 'icon-cursor' }
      ]
    },
    { name: 'Charts', url: '/charts', icon: 'icon-pie-chart' },
    { name: 'Editors', url: '/editors', icon: 'fa fa-code',
      children: [
        { name: 'Text Editors', url: '/editors/text-editors', icon: 'icon-note', badge: { variant: 'danger', text: 'PRO' } },
        { name: 'Code Editors', url: '/editors/code-editors', icon: 'fa fa-code', badge: { variant: 'danger', text: 'PRO' } }
      ]
    },
    { name: 'Forms', url: '/forms', icon: 'icon-note',
      children: [
        { name: 'Basic Forms', url: '/forms/basic-forms', icon: 'icon-note' },
        { name: 'Advanced', url: '/forms/advanced-forms', icon: 'icon-note', badge: { variant: 'danger', text: 'PRO' } },
        { name: 'Validation', url: '/forms/validation-forms', icon: 'icon-note', badge: { variant: 'danger', text: 'PRO' } },
      ]
    },
    { name: 'Google Maps', url: '/google-maps', icon: 'icon-map', badge: { variant: 'danger', text: 'PRO' } },    
  ];
}

export const navItems = menu;
