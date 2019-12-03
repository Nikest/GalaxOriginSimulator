import { BodyBase, IBodyBase, PlanetTexture } from 'Astro';
import { requester } from 'Services';

export interface IPlanet extends IBodyBase {
    atmosphere: number;
    typeRegular: string;
    orbitZone: number;
    gravity: number;
    hash: string;
    water: number;
    snowLine: number;
    percentInHabitable: number;
    moons?: number;
}

export interface IPlanetProps {
    radius: number;
    mass: number;
    type: string;
    typeRegular: string;
    name: string;
    gravity: number;
    water: number;
    snowLine: number;
    orbitZone: number;
    percentInHabitable: number;
    moons?: number;
}

export class Planet extends BodyBase implements IPlanet {
    atmosphere = 0;
    order = 0;
    typeRegular = '';
    orbitZone: number;
    gravity = 0;
    hash: string;
    water = 0;
    snowLine: number;
    percentInHabitable = 0;
    moons?: number;

    static makeRandomPlanet(star: any, order: number, orbitRadius): Promise<Planet> {
        return new Promise(resPlanet => {
            requester.makeRequest('getPlanet').then(set => {

                set.sendRequest({
                    orbitRadius,
                    order,
                    habitableZone: star.habitableZone,
                    name: star.name,

                }, (planetProps: any) => {
                    const planet = new Planet(planetProps);
                    resPlanet(planet);
                });
            });
        });
    }

    constructor(props: IPlanetProps) {
        super();

        this.radius = props.radius;
        this.mass = props.mass;
        this.type = props.type;
        this.typeRegular = props.typeRegular;
        this.name = props.name;
        this.gravity = props.gravity;
        this.water = props.water;
        this.snowLine = props.snowLine;
        this.orbitZone = props.orbitZone;
        this.percentInHabitable = props.percentInHabitable;
        this.moons = props.moons;

        this.class = 'planet';
        this.atmosphere = 0;
        this.texture = new PlanetTexture({
            size: 700,
            bodyBase: this
        });
    }
}
