import { BodyBase, IBodyBase, StarTexture } from 'Astro';
import { generateHash, requester } from 'Services';

export interface IStar extends IBodyBase {
    luminosity: number;
    habitableZone: number[];
    effTemperature: number;
    color: Uint8ClampedArray;
    hash: string;
}

interface IStarProps {
    radius: number;
    mass: number;
    type: string;
    name: string;
    habitableZone: number[];
    luminosity: number;
    effTemperature: number;
    R: number;
    G: number;
    B: number;
}

export class Star extends BodyBase implements IStar {
    luminosity = 0;
    habitableZone = [0, 0];
    effTemperature = 0;
    color: Uint8ClampedArray;
    hash = '';

    static makeRandomStar(): Promise<Star> {
        return new Promise((resStar => {
            requester.makeRequest('getStar').then(set => {
                set.sendRequest(null, (starProps: any) => {
                    const star = new Star(starProps);
                    resStar(star);
                })
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
        this.habitableZone = props.habitableZone;
        this.effTemperature = props.effTemperature;
        this.color = new Uint8ClampedArray([props.R, props.G, props.B]);

        this.class = 'star';
        this.hash = generateHash('star');
        this.texture = new StarTexture({
            size: 700,
            bodyBase: this,
        });
    }
}
