export class LoaderComponent {

    public loader: HTMLElement = null;
    private section:string = null;

    private createLoader():void {

        const new_loader = document.createElement('div');
              new_loader.setAttribute('class', 'loader');
              new_loader.setAttribute('id', 'general_loader');
              new_loader.innerHTML = `
                <div class="loader__container">
                <figure class="loader__image">
                    <img src="../../../assets/flipF.png" class="loader__image-photo" />
                    <span class="loader__image-spiner"></span>
                </figure>
                </div>
              `;

        this.loader = new_loader;

    }

    private deleteLoader():void {

        this.loader = null;
        this.section = null;

    }

    private allFocusOut():void {

        const inputs = document.querySelectorAll('input');

        inputs.forEach( (input: any) => {

            input.blur();

        });

    }

    public showLoader( section: string = 'root_html' ): void {

        this.section = section;
        this.allFocusOut();

        const create_loader = new Promise( (resolve: any) => {

            this.createLoader();
            resolve();

        });

        create_loader.then( () => {

            document.getElementById( this.section ).appendChild( this.loader );

        });

    }

    public hideLoader(): void {

        document.getElementById('general_loader').remove();
        this.deleteLoader();

    }

}
