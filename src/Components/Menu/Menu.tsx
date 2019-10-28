import * as React from 'react';

import { sl } from 'Services';

import { Galaxy } from 'Astro';

import { Button } from 'Components';


interface IMenuProps {

}

const generateSystem = () => {
    Galaxy.generateNewRandomSystem();
};

export const Menu = function({}:IMenuProps) {
    const c = sl(() => require('./Menu.scss'));

    return (
        <div className={c('container')}>
            <Button onClick={generateSystem}>Создать систему</Button>
        </div>
    );
};


