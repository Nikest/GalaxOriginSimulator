import { Planet, IPlanet, IPlanetProps, Astro } from 'GameModules/Astro';

export interface IMoon extends IPlanet {

}

interface IMoonProps extends IPlanetProps {
    order: number;
}

export class Moon extends Planet implements IMoon {

    static makeRandomMoon(orbitZone: number, planetType: string, percentInHabitable: number) {
        return new Promise(res => {
            Astro.worker().getPlanetRandomProps({
                orbitZone,
                planetType,
                percentInHabitable,
                moon: true,
            }).then((data) => {
                    const moon = new Moon(data);
                    res(moon)
                });
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
        this.hash = Astro.generateHash('moon');
        this.atmosphere = 0;
    }

    init() {
        this.calculateSelf();
    }

    calculateSelf() {
        this.barycenter.updated(this);
    }
}
