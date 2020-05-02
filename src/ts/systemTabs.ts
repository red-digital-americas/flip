export class TabsComponent {

    constructor(
        public root: string
    ) {}

    public createTabsApp():void {

        const famility_tabs = document.querySelectorAll( `[tabs-family=${ this.root }]` );

        let tabs = [],
            containers = [];

        famility_tabs.forEach( (root: any) => {

            if( root.hasAttribute('tab-show-content') ) tabs.push( root );
            if( root.hasAttribute('tab-id') ) containers.push( root );
            
            tabs[0].classList.add('folder__tab--active');
            showContainers();

        });

        tabs[0].classList.add('folder__tab--active');

        tabs.forEach( (tab: any) => {

            tab.onclick = () => {

                resetTabsStyles();
                activeTabSelected( tab.getAttribute('tab-show-content') );
                tab.classList.add('folder__tab--active');

            }

        });

        function activeTabSelected(id_tab: string):void {

            containers.forEach( (container: any) => {

                container.getAttribute('tab-id') == id_tab ? 
                    container.setAttribute('tab-visible', 'on') :
                    container.setAttribute('tab-visible', 'off');

            });

            showContainers();

        }

        function showContainers():void {

            containers.forEach( (container: any) => {

                container.getAttribute('tab-visible') == 'on' ? 
                    container.classList.remove('display-none') :
                    container.classList.add('display-none');

            });

        }

        function resetTabsStyles():void {

            tabs.forEach( (tab: any) => {

                tab.classList.remove('folder__tab--active');

            });

        }

    }

}