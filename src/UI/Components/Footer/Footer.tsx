import * as React from 'react';
import { cd, eventEmitter, command } from 'Services';
import { Button, modalService, EventText, TextareaPopup, IllustrationView } from 'UI';
import { Civilization } from 'GameModules/Civilization';
import { Galaxy } from 'GameModules/Astro';

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

                        <Button onClick={() => this.saveToJSON()}>To JSON</Button>

                        <Button onClick={() => this.loadFromJSON()}>From JSON</Button>
                    </div>
                ) }
            </div>
        )
    }

    colonizeSystem = () => {
        const civilization = new Civilization(Galaxy.getSystem());
        civilization.addEventListeners('historyMessage', (msg) => {
            modalService.open('Новое событие', <EventText text={msg}/>);
        });
        civilization.colonizeSystem();
    };

    saveToJSON = () => {
        command.send('galaxy.getSystemJSON', (json) => {
            modalService.open('Код системы', <TextareaPopup textareaData={json}/>)
        });
    };

    loadFromJSON = () => {
        modalService.open('Загрузить систему',
            <TextareaPopup
                button={'Загрузить'}
                textareaData={'Вставьте код системы'}
                onClick={(json) => {
                    command.send('galaxy.uploadSystemJSON', json);
                    modalService.close()
                }}/>)
    };

    componentDidMount(): void {
        eventEmitter.subscribe('galaxy.endGeneratingSystem', () => this.setState({system: true}));
    }
}



