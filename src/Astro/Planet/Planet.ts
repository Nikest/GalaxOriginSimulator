import { BodyBase, IBodyBase } from 'Astro';

export interface IPlanet extends IBodyBase {
    atmosphere: number;
}

interface IPlanetProps {
    size: number;
    mass: number;
    type: string;
    name: string;
}

export class Planet extends BodyBase implements IPlanet {
    atmosphere = 0;

    static randomPlanet(name: string) {
        return new Planet({
            size: 0,
            mass: 0,
            type: 'Jovian',
            name: name
        })
    }

    constructor(props: IPlanetProps) {
        super();

        this.size = props.size;
        this.mass = props.mass;
        this.type = props.type;
        this.name = props.name;

        this.class = 'planet';
        this.atmosphere = 0;
    }
}
