import * as React from 'react';

import { sl } from 'Services';


interface IButtonProps {
    children: any;
    onClick?: Function;
}


export const Button = function({children, onClick}:IButtonProps) {
    const c = sl(() => require('./Button.scss'));

    return (
        <button className={c('container')} onClick={() => onClick && onClick()}>
            <span className={c('text')}>{ children }</span>
        </button>
    )
};


