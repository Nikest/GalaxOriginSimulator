import { Planet, IPlanet, IPlanetProps } from 'Astro';
import { requester } from 'Services';

export interface IMoon extends IPlanet {

}

interface IMoonProps extends IPlanetProps {
    order: number;
}

export class Moon extends Planet implements IMoon {

    static makeRandomMoon(orbitZone: number, planetType: string, percentInHabitable: number): Promise<Moon> {
        return new Promise(resMoon => {
            requester.makeRequest('getMoon').then(set => {

                set.sendRequest({
                    orbitZone,
                    planetType,
                    percentInHabitable,
                    moon: true,

                }, (moonProps) => {
                    const moon = new Moon(moonProps);
                    resMoon(moon);
                })
            })
        });
    }

    constructor(props: IMoonProps) {
        super(props);

        this.radius = props.radius;
        this.mass = props.mass;
        this.type = props.type;
        this.typeRegular = props.typeRegular;
        this.name = props.name;
        this.order = props.order;
        this.gravity = props.gravity;
        this.water = props.water;
        this.snowLine = props.snowLine;
        this.orbitZone = props.orbitZone;
        this.percentInHabitable = props.percentInHabitable;

        this.class = 'moon';
        this.atmosphere = 0;
    }
}
