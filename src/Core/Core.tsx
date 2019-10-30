import * as React from 'react';
import { cd } from 'Services';
import { Header, SystemBrowser, Footer } from 'Components';
import { Modal } from 'Modal';

@cd(() => require('./Core.scss'))
export class Core extends React.Component {
  render(c?) {
    return (
        <article className={c('container')}>
            <div className={c('header cell')}>
                <Header/>
            </div>
            <div className={c('main cell')}>
                <SystemBrowser/>
            </div>
            <div className={c('footer cell')}>
                <Footer/>
            </div>
            <Modal/>
        </article>
    )
  }
}

