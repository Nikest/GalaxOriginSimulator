import * as React from 'react';

import { sl, command } from 'Services';
import { modalService, Button } from 'UI';


interface IMenuProps {

}

const generateSystem = () => {
    command.send('galaxy.makeSystem')
};


export const Menu = function({}:IMenuProps) {
    const c = sl(() => require('./Menu.scss'));

    return (
        <div className={c('container')}>
            <Button onClick={generateSystem}>Сгенерировать новую систему</Button>
        </div>
    );
};


