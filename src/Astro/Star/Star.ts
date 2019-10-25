import { BodyBase, IBodyBase } from 'Astro';

export interface IStar extends IBodyBase {
    luminosity: number;
}

interface IStarProps {
    size: number;
    mass: number;
    type: string;
    name: string;
}

export class Star extends BodyBase implements IStar {
    luminosity = 0;

    static randomStar(name: string) {
        return new Star({
            name,
            size: 0,
            mass: 0,
            type: 'G2V'
        });
    }

    constructor(props: IStarProps) {
        super();

        this.size = props.size;
        this.mass = props.mass;
        this.type = props.type;
        this.name = props.name;

        this.class = 'star';
        this.luminosity = 0;
    }
}
