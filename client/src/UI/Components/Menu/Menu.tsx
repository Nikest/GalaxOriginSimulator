import * as React from 'react';
import { Galaxy } from 'Astro';
import { sl, requester } from 'Services';
import { Button, TestTexture, modalService } from 'UI';


interface IMenuProps {

}

const generateSystem = () => {
    Galaxy.showSystem((system) => {
        console.log(system);
    })
};

const makeTexture = () => {
    modalService.open('Test texture', <TestTexture/>)
};


export const Menu = function({}:IMenuProps) {
    const c = sl(() => require('./Menu.scss'));

    return (
        <div className={c('container')}>
            <Button onClick={generateSystem}>Сгенерировать новую систему</Button>
            <Button onClick={makeTexture}>Make texture</Button>
        </div>
    );
};


