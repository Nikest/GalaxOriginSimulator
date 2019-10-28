import {Star, Planet, Barycenter, Moon, BodyBase} from 'Astro';
import { astroWorker } from 'Astro/Services';
import { rand, getNamesInStyle } from 'Services';

interface ISystem {
    name: string;
    system: Barycenter;
    onUpdated(fn: Function);
    updated(data: any);
    setBarycenter(barycenter: Barycenter);
}

export class System implements ISystem {
    name = '';
    system: Barycenter;

    static makeRandomSystem(): Promise<System> {
        return new Promise(res => {
            const system = new System();

            Star.makeRandomStar().then((star: Star) => {
                const mainCenter = new Barycenter(star, null);
                mainCenter.setSystemLink(system);

                const planetsPromices = astroWorker.getPlanetsTemplateCount((p, i) => {
                    return Planet.makeRandomPlanet(star.name, i)
                });

                Promise.all(planetsPromices).then((planetsArray: Planet[]) => {
                    const planets = planetsArray.map((planet, i) => {
                        return new Barycenter(planet, mainCenter)
                    });

                    const moonsPromices = planets.map((b: Barycenter) => {
                        return Promise.all(astroWorker.getMoonsTemplateCount(b.centralBody.type, (m, i) => {
                            return Moon.makeRandomMoon(b.centralBody.name, b.centralBody.type, i)
                        }))
                    });

                    Promise.all(moonsPromices).then(moons => {
                        moons.forEach((moonArray: Moon[], i: number) => {
                            if (moonArray.length > 0) {
                                moonArray.forEach((moon: Moon) => {
                                    planets[i].centralBody.setSatellite(moon)
                                });

                                astroWorker.generateOrbitsRadius(planets[i])
                            }
                        });


                        mainCenter.setToOrbits(planets);
                        astroWorker.generateOrbitsRadius(mainCenter);

                        system.setBarycenter(mainCenter);
                        res(system);
                    });
                });
            });
        })
    }

    constructor() {

    }

    private onUpdatedListener: Function[] = [];
    onUpdated(fn) {
        this.onUpdatedListener.push(fn)
    }

    private updateTimer: any;
    updated(body) {
        clearTimeout(this.updateTimer);

        this.updateTimer = setTimeout(() => {
            this.onUpdatedListener.forEach(f => f(body))
        }, 250);
    }

    init() {
        this.system.centralBody.init();
        this.system.orbits.forEach(b => {
            b.centralBody.init();
            b.orbits.forEach(b => {
                b.centralBody.init();
            })
        })
    }

    setBarycenter(barycenter: Barycenter) {
        this.system = barycenter;
        this.name = barycenter.centralBody.name;

        setTimeout(() => this.init(), 0)
    }
}
