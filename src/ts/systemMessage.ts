import { Settings } from "http2";

export class SystemMessage {

    private message_settings: MessageSettings = new MessageSettings();

    private createMessageContainer( message_settings: MessageSettings ): HTMLElement {

        const message_container = document.createElement('div');

              message_container.setAttribute('system-message', 'system-message');
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

        const get_root = document.getElementById( settings.where );
              get_root.appendChild( this.createMessageContainer( settings ));

        this.stylingMessages( settings );

    }

    private stylingMessages( settings_message: MessageSettings = null ):void {

        let messages_in = document.querySelectorAll('[system-message]');

            messages_in.forEach( (message: any, index: number) => {

                let padding_top = index == 0 ? 1 : index + 1;

                message.style.top = `${ ( message.offsetHeight + 10 ) * padding_top }px`;

                if( messages_in.length == index + 1 ) this.destroyMessage( messages_in, settings_message.time );

            });

    }

    private destroyMessage( messages: any, time_to_destroy: number ):void { 

        if( messages.length == 6 ) {

            messages[0].classList.add('system-message--animation-out');

            setTimeout( () => {

                messages[0].remove();
                this.stylingMessages();

            }, 600);

        }

        initRemoverMessage();

        function initRemoverMessage():void {

            if( messages.length <= 5 ) {

                let timer = 1;

                for( let message = messages.length; message--; ) {

                    setTimeout( () => {

                        messages[message].classList.add('system-message--animation-out');
                        timer += 1;

                        setTimeout( () => {

                            messages[message].remove();

                        }, 600);

                    }, time_to_destroy * timer);

                }

            }

        }

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