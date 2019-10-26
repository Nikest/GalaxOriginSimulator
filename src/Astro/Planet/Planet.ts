import { BodyBase, IBodyBase } from 'Astro';
import { astroWorker } from 'Astro/Services';

export interface IPlanet extends IBodyBase {
    atmosphere: number;
}

interface IPlanetProps {
    radius: number;
    mass: number;
    type: string;
    name: string;
}

export class Planet extends BodyBase implements IPlanet {
    atmosphere = 0;

    static makeRandomPlanet(name: string) {
        return new Promise(res => {
            astroWorker.getPlanetRandomProps({name})
                .then(({data}) => {
                    const planet = new Planet({...data});
                    res(planet)
                });
        });
    }

    constructor(props: IPlanetProps) {
        super();

        this.radius = props.radius;
        this.mass = props.mass;
        this.type = props.type;
        this.name = props.name;

        this.class = 'planet';
        this.atmosphere = 0;
    }
}
