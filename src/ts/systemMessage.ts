export class SystemMessage {

    private message_settings: MessageSettings = new MessageSettings();

    private createMessageContainer( message_settings: MessageSettings ): HTMLElement {

        const message_container = document.createElement('div');

              message_container.setAttribute('id', 'system_messsage');
              message_container.setAttribute('class', `system-message system-message--animation-in system-message__${ message_settings.kind }`);
              message_container.innerHTML = `
                    <h4 class="system-message__titulo">
                        ${ message_settings.message.header }
                    </h4>
                    <p class="system-message__text">
                        ${ message_settings.message.text }
                    </p>
                `;

        return message_container;

    }

    public showMessage( settings: MessageSettings ):void {
        
        if( settings.where == undefined ) settings.where = 'root_html'; console.log( settings );

        const get_sm_container = document.getElementById('system_messsage'),
              get_root = document.getElementById( settings.where ),
              init_message_functions = new Promise( ( resolve ) => {

                get_sm_container == null ? resolve( true ) : resolve( false );

              });

              init_message_functions.then( (result: boolean) => {

                if( result ) {

                    get_root.appendChild( this.createMessageContainer( settings ) );
                    this.destroyMessage( settings.time );

                }

              });

    }

    private destroyMessage( time: number ):void { console.log( time );

        setTimeout( () => {

            document.getElementById('system_messsage').classList.remove('system-message--animation-in');
            document.getElementById('system_messsage').classList.add('system-message--animation-out');

            setTimeout( () => {

                document.getElementById('system_messsage').remove();

            }, 1700);

        }, time + 777);

    }

}

class MessageSettings {
    kind: string = '';
    time: number = 1000;
    message: {header: string, text: string} = {
        header: '',
        text: ''
    };
    where?: string;
}