import * as React from 'react';
import { sl, starDescriptor } from 'Services';
import { Button, Preloader, IllustrationView } from 'UI';


interface IStarViewProps {
    star: any;
}


export const StarView = function({star}:IStarViewProps) {
    const c = sl(() => require('./StarView.scss'));

    return (
        <section className={c('container')}>
            <div className={c('title')}>{ star.name }</div>

            <div className={c('illustration')}>
                <IllustrationView size={300} astroBody={star} hash={star.hash}/>
            </div>

            <div className={c('description')}>
                <span className={c('cell key')}>Класс</span>
                <span className={c('cell val')}><span className={c('label')}>{star.type}</span></span>
                <span className={c('cell key')}>Радиус (в сол.)</span>
                <span className={c('cell val')}>{starDescriptor.getRadius(star.radius)}</span>

                <span className={c('cell key')}>Масса (в сол.)</span>
                <span className={c('cell val')}>{starDescriptor.getMass(star.mass)}</span>

                <span className={c('cell key')}>Светимость (в сол.)</span>
                <span className={c('cell val')}>{starDescriptor.getLuminosity(star.luminosity)}</span>

                <span className={c('cell key')}>Температура</span>
                <span className={c('cell val')}>{star.effTemperature} K</span>

                <span className={c('double-cell')}><Button>Дополнительная информация</Button></span>
            </div>
        </section>
    )
};


