import * as React from 'react';
import { Button, Preloader } from 'Components';
import { sl, planetDescriptor } from 'Services';
import { Planet } from 'Astro';


interface IPlanetViewProps {
    planet: Planet;
    children: any;
}


export const PlanetView = function({planet, children}:IPlanetViewProps) {
    const c = sl(() => require('../StarView/StarView.scss'));

    return (
        <section className={c('container planet')}>
            <div className={c('title')}>{ planet.name }</div>
            <div className={c('illustration')}><Preloader/></div>
            <div className={c('description')}>
                <span className={c('cell key')}>Класс</span>
                <span className={c('cell val')}>
                    <span className={c('label')}>{planetDescriptor.getType(planet.type)}</span>
                </span>

                <span className={c('cell key')}>Радиус (в зем.)</span>
                <span className={c('cell val')}>{planetDescriptor.getRadius(planet.radius)}</span>

                <span className={c('cell key')}>Графитация g</span>
                <span className={c('cell val')}>{planetDescriptor.getGravity(planet.gravity)}</span>

                <span className={c('cell key')}>Атмосфера</span>
                <span className={c('cell val')}>{planet.atmosphere}</span>

                <span className={c('cell key')}>Колличество лун</span>
                <span className={c('cell val')}>{planet.barycenter.orbits.length}</span>

                <span className={c('cell key')}>Радиус орбиты</span>
                <span className={c('cell val')}>{planetDescriptor.getOrbitRadius(planet.barycenter.selfOrbit.A)}</span>

                <span className={c('cell key')}>Оборот по орбите <br/>(земное время)</span>
                <span className={c('cell val')}>{planetDescriptor.getOrbitTime(planet.barycenter.selfOrbit)}</span>

                <span className={c('cell key')}>Положение</span>
                <span className={c('cell val')}>
                    <span className={c(`label-descr t-${planet.orbitZone}`)}>{planetDescriptor.getZone(planet.orbitZone)}</span>
                </span>

                <span className={c('double-cell')}>
                    <span className={c('label warning big')}>Не колонизирована</span>
                </span>

                <span className={c('double-cell')}><Button>Дополнительная информация</Button></span>
            </div>

            { children }
        </section>
    )
};


