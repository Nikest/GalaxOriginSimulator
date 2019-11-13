import * as React from 'react';
import { modalService } from './modalService';
import { cd } from 'Services';


interface IModalProps {

}


interface IModalState {
    title: string;
    content: any;
}

@cd(() => require('./Modal.scss'))
export class Modal extends React.Component<IModalProps, IModalState> {
    state = {
        title: '',
        content: null
    };
    render(c?) {
        const { title, content } = this.state;
        if (!content) return null;

        return (
            <div className={c('container')}>
                <div className={c('overlay')} onClick={this.close}/>
                <main className={c('content')}>
                    <div className={c('title')}>{title}</div>
                    <div className={c('modal-content')}>{content}</div>
                </main>
            </div>
        )
    }

    open = (title: string, content: any) => {
        this.setState({title, content})
    };

    close = () => this.setState({content: null});

    componentDidMount(): void {
        modalService.onInstance({
            open: this.open,
            close: this.close
        })
    }
}


