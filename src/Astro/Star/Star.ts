import { BodyBase, IBodyBase } from 'Astro';
import { astroWorker } from 'Astro/Services';

export interface IStar extends IBodyBase {
    luminosity: number;
    habitableZone: number[];
}

interface IStarProps {
    radius: number;
    mass: number;
    type: string;
    name: string;
    habitableZone: number[];
    luminosity: number;
    farOrbit: number;
}

export class Star extends BodyBase implements IStar {
    luminosity = 0;
    habitableZone = [0, 0];

    static makeRandomStar(): Promise<Star> {
        return new Promise((res => {
            astroWorker.getStarRandomProps()
                .then(({data}) => {
                    const star = new Star({...data});
                    res(star)
                });
        }));
    }

    constructor(props: IStarProps) {
        super();

        this.radius = props.radius;
        this.mass = props.mass;
        this.type = props.type;
        this.name = props.name;
        this.luminosity = props.luminosity;
        this.farOrbit = props.farOrbit;
        this.habitableZone = props.habitableZone;

        this.class = 'star';
    }
}
