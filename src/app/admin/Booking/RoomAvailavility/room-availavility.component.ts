import { Component, OnInit } from '@angular/core';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
    selector: 'room-availavility',
    styleUrls: ['./room-availavility.component.scss'],
    templateUrl: './room-availavility.component.html'
})
export class RoomAvailavilityComponent implements OnInit {

    /*Autor: Carlos Enrique Hernandez Hernandez*/

    constructor() {}

    public section: string;

    public createFolderApp(): void {

        const tabs_family = document.querySelectorAll('[tabs-family="test"]');

        let tabs = [],
            containers = [];

        tabs_family.forEach( (tab: any) => {

            if( tab.hasAttribute('tab-show-content') ) {

                tabs.push( tab );

            }

            if( tab.hasAttribute('tab-id') ) {

                containers.push( tab );

            }

        });

        tabs[0].classList.add('folder__tab--active');

        containers.forEach( (container: any) => {

            if( container.getAttribute('tab-visible') !== 'on' ) {
                
                container.classList.add('display-none');

            }

        });

        tabs.forEach( (tab: any) => {

            tab.onclick = (event) => {

                const event_data = event.target;

                resetTabs();

                event_data.classList.add('folder__tab--active');

                containers.forEach( (container: any) => {

                    if( event_data.getAttribute('tab-show-content') == container.getAttribute('tab-id') ) {

                        container.setAttribute('tab-visible', 'on');
                        showContainerSelected();

                    }

                });

            }

        });

        function resetTabs():void {

            tabs.forEach( (tab: any) => {

                tab.classList.remove('folder__tab--active');

            });

            containers.forEach( (container: any) => {

                container.setAttribute('tab-visible', 'off');

            });

        }

        function showContainerSelected() {

            containers.forEach( (container: any) => {

                container.getAttribute('tab-visible') == 'on' ? 
                    container.classList.remove('display-none') :
                    container.classList.add('display-none');

            });

        }

    }

    ngOnInit() {

        this.createFolderApp();
        this.section = 'roomAvailavility';

    }

}