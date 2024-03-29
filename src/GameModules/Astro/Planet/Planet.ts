import { BodyBase, IBodyBase } from 'GameModules/Astro';
import { astroWorker } from 'GameModules/Astro/Services';

export interface IPlanet extends IBodyBase {
    atmosphere: number;
    order: number;
    subType: string;
    orbitZone: 0 | 2 | 3;
    gravity: number;
}

interface IPlanetProps {
    radius: number;
    mass: number;
    type: string;
    name: string;
    order: number;
    gravity: number;
}

const names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

export class Planet extends BodyBase implements IPlanet {
    atmosphere = 0;
    order = 0;
    subType: '';
    orbitZone: 0;
    gravity; 0;

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
        this.gravity = props.gravity;

        this.class = 'planet';
        this.atmosphere = 0;
    }

    init() {
        this.calculateSelf()
    }

    calculateSelf() {
        const habitable = this.barycenter.outer.centralBody['habitableZone'];
        const orbitRadius = this.barycenter.selfOrbit.A;

        astroWorker.recalculatePlanetType(habitable, this.type, orbitRadius)
            .then(({data}) => {
                this.orbitZone = data.orbitZone;
                this.type = data.type;

                this.barycenter.updated(this);
            });
    }
}
