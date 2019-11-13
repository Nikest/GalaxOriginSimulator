import * as React from 'react';
import { BROWSER_BG_1 } from 'UI/Asserts/Images/Backgrounds';
import { cd, eventEmitter, storeInjector } from 'Services';
import { StarView, PlanetView, Preloader, MoonView } from 'UI';


interface ISystemBrowserProps {

}


interface ISystemBrowserState {
    system: any;
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
                    <StarView star={system.centralBody}/>
                    { system.orbits.map((barycenter, i) => {
                        return (
                            <PlanetView key={i} barycenter={barycenter}>
                                <div className={c('collumn-wrapper')}>
                                    { barycenter.orbits.map((barycenter) => {
                                        return <MoonView barycenter={barycenter}/>
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

    @storeInjector(['viewSystem'])
    onStoreUpdated({viewSystem}) {
        this.setState({system: viewSystem, isLoading: false})
    }

    componentDidMount(): void {

    }
}



