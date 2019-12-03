import { BodyBase, IBodyBase, Star, Astro } from 'GameModules/Astro';

export interface IPlanet extends IBodyBase {
    atmosphere: number;
    typeRegular: string;
    orbitZone: number;
    gravity: number;
    hash: string;
    water: number;
    snowLine: number;
    percentInHabitable: number;
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

    static makeRandomPlanet(star: Star, order: number, orbitRadius) {
        return new Promise(res => {
            Astro.worker().getPlanetRandomProps({
                orbitRadius,
                order,
                habitableZone: star.habitableZone,
                name: star.name
            }).then((data: IPlanetProps) => {
                    const planet = new Planet(data);
                    res(planet)
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

        this.class = 'planet';
        this.hash = Astro.generateHash('planet');
        this.atmosphere = 0;
    }

    init() {
        this.calculateSelf()
    }

    calculateSelf() {
        this.barycenter.updated(this);
    }
}
