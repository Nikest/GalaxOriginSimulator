import { Planet, IPlanet } from 'Astro';
import {astroWorker} from "Astro/Services";

export interface IMoon extends IPlanet {

}

interface IMoonProps {
    radius: number;
    mass: number;
    type: string;
    name: string;
    order: number;
}

const names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

export class Moon extends Planet implements IMoon {

    static makeRandomMoon(systemName: string, planetType: string, order: number) {
        return new Promise(res => {
            const name = `${systemName}-${order + 1}`;
            astroWorker.getPlanetRandomProps({name, planetType})
                .then(({data}) => {
                    const moon = new Moon({...data});
                    res(moon)
                });
        });
    }

    constructor(props: IMoonProps) {
        super(props);

        this.radius = props.radius;
        this.mass = props.mass;
        this.type = props.type;
        this.name = props.name;
        this.order = props.order;

        this.class = 'moon';
        this.atmosphere = 0;
    }

    init() {
        this.calculateSelf();
    }

    calculateSelf() {
        const habitable = this.barycenter.outer.outer.centralBody['habitableZone'];
        const orbitRadius = this.barycenter.outer.selfOrbit.A;


        astroWorker.calculatePlanetSubType(habitable, this.type, orbitRadius)
            .then(({data}) => {
                this.orbitZone = data.orbitZone;
                this.type = data.type;

                this.barycenter.updated(this);
            });
    }
}
