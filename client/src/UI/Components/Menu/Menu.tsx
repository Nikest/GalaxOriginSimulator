import * as React from 'react';

import { sl, requester } from 'Services';
import { Button } from 'UI';


interface IMenuProps {

}

const generateSystem = () => {
    requester.getSystem();
};


export const Menu = function({}:IMenuProps) {
    const c = sl(() => require('./Menu.scss'));

    return (
        <div className={c('container')}>
            <Button onClick={generateSystem}>Сгенерировать новую систему</Button>
        </div>
    );
};


