import * as React from 'react';

import { cd } from 'Services';


interface IFooterProps {

}


interface IFooterState {

}

@cd(() => require('./Footer.scss'))
export class Footer extends React.Component<IFooterProps, IFooterState> {
    render(c?) {
        return (
            <div className={c('container')}>Footer</div>
        )
    }
}



