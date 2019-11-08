import * as React from 'react';
import { Moon } from 'GameModules/Astro';
import { sl, planetDescriptor } from 'Services';
import { Preloader } from 'UI';

interface IMoonViewProps {
    moon: Moon;
}

export const MoonView = function({moon}:IMoonViewProps) {
    const c = sl(() => require('../StarView/StarView.scss'));

    return (
        <section className={c('container')}>
            <div className={c('title small')}>{moon.name}</div>
            <div className={c('moon')}>
                <div className={c('illustration')}><Preloader/></div>
                <div className={c('description')}>
                    <span className={c('cell key')}>Класс</span>
                    <span className={c('cell val')}>
                        <span className={c('label')}>{planetDescriptor.getType(moon.type)}</span>
                    </span>

                    <span className={c('cell key')}>Гравитация g</span>
                    <span className={c('cell val')}>{planetDescriptor.getGravity(moon.gravity)}</span>

                    <span className={c('double-cell')}>
                        <span className={c('label warning big')}>Не колонизирована</span>
                    </span>
                </div>
            </div>
        </section>
    )
};


