import * as React from 'react';
import { sl, planetDescriptor } from 'Services';
import {IllustrationView, Preloader} from 'UI';

interface IMoonViewProps {
    barycenter: any;
}

export const MoonView = function({barycenter}:IMoonViewProps) {
    const c = sl(() => require('../StarView/StarView.scss'));

    return (
        <section className={c('container')}>
            <div className={c('title small')}>{barycenter.centralBody.name}</div>
            <div className={c('moon')}>
                <div className={c('illustration')}>
                    <IllustrationView hash={barycenter.centralBody.hash} size={300} astroBody={barycenter.centralBody}/>
                </div>
                <div className={c('description')}>
                    <span className={c('cell key')}>Класс</span>
                    <span className={c('cell val')}>
                        <span className={c('label')}>{planetDescriptor.getType(barycenter.centralBody.type)}</span>
                    </span>

                    <span className={c('cell key')}>Гравитация g</span>
                    <span className={c('cell val')}>{planetDescriptor.getGravity(barycenter.centralBody.gravity)}</span>

                    <span className={c('double-cell')}>
                        <span className={c('label warning big')}>Не колонизирована</span>
                    </span>
                </div>
            </div>
        </section>
    )
};


