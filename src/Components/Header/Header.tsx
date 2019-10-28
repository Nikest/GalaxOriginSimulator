import * as React from 'react';

import { sl } from 'Services';
import { Menu } from 'Components';


interface IHeaderProps {

}


export const Header = function({}:IHeaderProps) {
    const c = sl(() => require('./Header.scss'));

    return (
        <header className={c('container')}>
            <Menu/>
        </header>
    )
};


