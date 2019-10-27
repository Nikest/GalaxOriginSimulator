import { BodyBase, IBodyBase } from 'Astro';
import { astroWorker } from 'Astro/Services';

export interface IPlanet extends IBodyBase {
    atmosphere: number;
    order: number;
}

interface IPlanetProps {
    radius: number;
    mass: number;
    type: string;
    name: string;
    order: number;
}

const names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

export class Planet extends BodyBase implements IPlanet {
    atmosphere = 0;
    order = 0;

    static makeRandomPlanet(systemName: string, order: number) {
        return new Promise(res => {
            const name = `${systemName}-${names[order]}`;
            astroWorker.getPlanetRandomProps({name})
                .then(({data}) => {
                    const planet = new Planet({...data, order});
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
        this.order = props.order;

        this.class = 'planet';
        this.atmosphere = 0;
    }
}
