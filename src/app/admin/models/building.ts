export class Building {
    id: number;
    name: string;
    description: string;
    status: boolean;
    direction: string;
    photo: string;
    typeRoom: TypeRoom[];
}

export class TypeRoom{
    id: number;
    type: string;
    idBuild: number;
    capacity: number;
    active: boolean
}