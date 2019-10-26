import { BodyBase, IBodyBase } from 'Astro';
import { astroWorker } from 'Astro/Services';

export interface IStar extends IBodyBase {
    luminosity: number;
}

interface IStarProps {
    radius: number;
    mass: number;
    type: string;
    name: string;
}

export class Star extends BodyBase implements IStar {
    luminosity = 0;

    static makeRandomStar(name: string): Promise<Star> {
        return new Promise((res => {
            astroWorker.getStarRandomProps({name})
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

        this.class = 'star';
        this.luminosity = 0;
    }
}
