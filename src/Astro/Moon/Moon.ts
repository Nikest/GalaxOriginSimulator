import { Planet, IPlanet } from 'Astro';

export interface IMoon extends IPlanet {

}

interface IMoonProps {
    size: number;
    mass: number;
    type: string;
    name: string;
}

export class Moon extends Planet implements IMoon {

    static randomMoon(name: string) {
        return new Moon({
            size: 0,
            mass: 0,
            type: 'selena',
            name: name
        })
    }

    constructor(props: IMoonProps) {
        super(props);

        this.size = props.size;
        this.mass = props.mass;
        this.type = props.type;
        this.name = props.name;

        this.class = 'moon';
        this.atmosphere = 0;
    }
}
