import * as React from 'react';

import { sl } from 'Services';

import { Galaxy } from 'Astro';
import { Civilization } from 'Civilization';
import { Button } from 'Components';


interface IMenuProps {

}

const generateSystem = () => {
    Galaxy.generateNewRandomSystem();
};

const createCivilization = () => {
    const civilization = new Civilization(Galaxy.getSystem());
    civilization.colonizeSystem();
};

export const Menu = function({}:IMenuProps) {
    const c = sl(() => require('./Menu.scss'));

    return (
        <div className={c('container')}>
            <Button onClick={generateSystem}>Создать систему</Button>
            <Button onClick={createCivilization}>Колонизировать систему</Button>
        </div>
    );
};


