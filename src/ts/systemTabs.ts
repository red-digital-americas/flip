export class TabsComponent {

    constructor(
        public root: string
    ) {}

    public createTabsApp():void {

        console.log('Este es el padre => ', this.root );

    }

}