import * as React from 'react';
import { cd, eventEmitter } from 'Services';
import { Button } from 'UI';

interface IFooterProps {

}


interface IFooterState {
    system: boolean
}

@cd(() => require('./Footer.scss'))
export class Footer extends React.Component<IFooterProps, IFooterState> {
    state = {
        system: false
    };
    render(c?) {
        const { system } = this.state;
        return (
            <div className={c('container')}>
                { system && (
                    <div className={c('buttons-wrapper')}>
                        <Button onClick={() => this.colonizeSystem()}>Колонизировать систему</Button>
                    </div>
                ) }
            </div>
        )
    }

    colonizeSystem = () => {

    };

    componentDidMount(): void {
        eventEmitter.subscribe('galaxy.endGeneratingSystem', () => this.setState({system: true}));
    }
}



