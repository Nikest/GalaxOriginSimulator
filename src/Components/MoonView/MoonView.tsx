import * as React from 'react';
import { Moon } from 'Astro';
import { sl, planetDescriptor } from 'Services';
import {Preloader} from "Components";


interface IMoonViewProps {
    moon: Moon;
}


export const MoonView = function({moon}:IMoonViewProps) {
    const c = sl(() => require('../StarView/StarView.scss'));

    return (
        <section className={c('container moon')}>
            <div className={c('illustration')}><Preloader/></div>
            <div className={c('description')}>
                <div className={c('title')}>{moon.name}</div>
                <span className={c('cell key')}>Класс</span>
                <span className={c('cell val')}>
                    <span className={c('label')}>{planetDescriptor.getType(moon.type)}</span>
                </span>
            </div>
        </section>
    )
};


