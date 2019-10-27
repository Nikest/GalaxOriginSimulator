import { Star, Planet, Barycenter, Moon } from 'Astro';
import { astroWorker } from 'Astro/Services';
import { rand, getNamesInStyle } from 'Services';

interface ISystem {
    name: string;
    system: Barycenter;
}

export class System implements ISystem {
    name = '';
    system: Barycenter;

    static makeRandomSystem(): Promise<System> {
        return new Promise(res => {
            const names = getNamesInStyle();

            Star.makeRandomStar().then((star: Star) => {
                const mainCenter = new Barycenter(star, null);

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

                        const system = new System(mainCenter);
                        console.log(system);
                        res(system);
                    });
                });
            });
        })
    }

    constructor(system: Barycenter) {
        this.system = system;
        this.name = system.centralBody.name;
    }
}
