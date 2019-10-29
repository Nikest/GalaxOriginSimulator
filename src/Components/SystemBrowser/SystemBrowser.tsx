import * as React from 'react';
import { BROWSER_BG_1 } from 'Asserts/Images/Backgrounds';
import { cd } from 'Services';
import { Galaxy, System } from 'Astro';
import { StarView, PlanetView, Preloader, MoonView } from 'Components';


interface ISystemBrowserProps {

}


interface ISystemBrowserState {
    system: System;
    isLoading: boolean;
}

@cd(() => require('./SystemBrowser.scss'))
export class SystemBrowser extends React.Component<ISystemBrowserProps, ISystemBrowserState> {
    state = {
        system: null,
        isLoading: false,
    };

    render(c?) {
        const { system, isLoading } = this.state;
        let content = <span/>;

        if (system) {
            content = (
                <div className={c('browser')}>
                    <StarView star={system.system.centralBody}/>
                    { system.system.orbits.map((barycenter, i) => {
                        return (
                            <PlanetView key={i} planet={barycenter.centralBody}>
                                <div className={c('collumn-wrapper')}>
                                    { barycenter.orbits.map((barycenter) => {
                                        return <MoonView moon={barycenter.centralBody}/>
                                    }) }
                                </div>
                            </PlanetView>
                        )
                    }) }
                </div>
            )
        }

        return (
            <main className={c('container')} style={{backgroundImage: `url(${BROWSER_BG_1})`}}>
                { isLoading ? <Preloader/> : content }
            </main>
        )
    }

    componentDidMount(): void {
        Galaxy.onStartSystemGenerating(() => this.setState({isLoading: true}));
        Galaxy.onSystemGenerated((system) => {
            this.setState({system, isLoading: false})
        })
    }
}



