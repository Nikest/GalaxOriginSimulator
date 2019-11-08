import * as React from 'react';

import { sl } from 'Services';

interface IEventTextProps {
    text: any;
}

export const EventText = function({text}:IEventTextProps) {
    const c = sl(() => require('./EventText.scss'));

    return (
        <div className={c('container')}>
            { text }
        </div>
    );
};
