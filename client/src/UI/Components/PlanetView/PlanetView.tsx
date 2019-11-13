import * as React from 'react';
import { Button, Preloader, IllustrationView } from 'UI';
import { sl, planetDescriptor } from 'Services';


interface IPlanetViewProps {
    barycenter: any;
    children: any;
}


export const PlanetView = function({barycenter, children}:IPlanetViewProps) {
    const c = sl(() => require('../StarView/StarView.scss'));

    return (
        <section className={c('container planet')}>
            <div className={c('title')}>{ barycenter.centralBody.name }</div>

            <div className={c('illustration')}>
                <IllustrationView hash={barycenter.centralBody.hash} size={300} astroBody={barycenter.centralBody}/>
            </div>

            <div className={c('description')}>
                <span className={c('cell key')}>Класс</span>
                <span className={c('cell val')}>
                    <span className={c('label')}>
                        {barycenter.centralBody.type + ' ' + barycenter.centralBody.typeRegular}
                    </span>
                </span>

                <span className={c('cell key')}>Радиус (в зем.)</span>
                <span className={c('cell val')}>{planetDescriptor.getRadius(barycenter.centralBody.radius)}</span>

                <span className={c('cell key')}>Гравитация g</span>
                <span className={c('cell val')}>{planetDescriptor.getGravity(barycenter.centralBody.gravity)}</span>

                <span className={c('cell key')}>Water</span>
                <span className={c('cell val')}>{barycenter.centralBody.water}</span>

                <span className={c('cell key')}>Snow Lina</span>
                <span className={c('cell val')}>{barycenter.centralBody.snowLine}</span>

                <span className={c('cell key')}>Percent</span>
                <span className={c('cell val')}>{barycenter.centralBody.percent}</span>

                <span className={c('cell key')}>Радиус орбиты</span>
                <span className={c('cell val')}>{planetDescriptor.getOrbitRadius(barycenter.selfOrbit.A)}</span>

                <span className={c('cell key')}>Оборот по орбите <br/>(земное время)</span>
                <span className={c('cell val')}>{planetDescriptor.getOrbitTime(barycenter.selfOrbit)}</span>

                <span className={c('cell key')}>Положение</span>
                <span className={c('cell val')}>
                    <span className={c(`label-descr t-${barycenter.centralBody.orbitZone}`)}>
                        {planetDescriptor.getZone(barycenter.centralBody.orbitZone)}
                    </span>
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


