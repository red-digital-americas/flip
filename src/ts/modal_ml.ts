export class ModalMLComponent {

    public openModalSelected():void {

        const get_modals = document.querySelectorAll('[modal_trigger]'),
              modal_toggle = document.querySelectorAll('[modal_toggle]'),
              section_name = document.querySelectorAll('[section-name]'),
              section_to_show = document.querySelectorAll('[section-to-show]');
        
        get_modals.forEach( ( modal:HTMLElement ) => {

            modal.onclick = () => {

                const modal_attatch = modal.getAttribute('modal_trigger');

                modal_toggle.forEach( ( to_open:any ) => {

                    const find_modal = to_open.getAttribute('modal_toggle'); 

                    if( find_modal === modal_attatch ) {

                        to_open.classList.contains('display-none') ? 
                            to_open.classList.remove('display-none') : 
                            to_open.classList.add('display-none');

                    }

                });

            }

        });

        section_to_show.forEach( ( section:HTMLElement ) => {

            section.onclick = () => {

                const section_selected = section.getAttribute('section-to-show');

                section_name.forEach( ( section_finder:any ) =>  {

                    const section_to_find = section_finder.getAttribute('section-name');

                    if( section_to_find === section_selected ) {

                        section_finder.classList.contains('display-none') ?
                            section_finder.classList.remove('display-none') :
                            section_finder.classList.add('display-none');
                    }

                });

            };

        });

    }

}