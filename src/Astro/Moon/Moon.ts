import { Planet, IPlanet } from 'Astro';
import {astroWorker} from "Astro/Services";

export interface IMoon extends IPlanet {

}

interface IMoonProps {
    radius: number;
    mass: number;
    type: string;
    name: string;
}

export class Moon extends Planet implements IMoon {

    static makeRandomMoon(name: string, planetType: string) {
        return new Promise(res => {
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

        this.class = 'moon';
        this.atmosphere = 0;
    }
}
