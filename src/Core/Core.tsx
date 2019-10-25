import * as React from 'react';
import { cd, getNamesInStyle } from 'Services';
import { System } from 'Astro';

@cd(() => require('./Core.scss'))
export class Core extends React.Component {
  state = {
    system: null
  };

  render(c?) {
    const { system } = this.state;
    return (
      <div className={c('container')}>
        <button onClick={this.makeSystem}>make system</button>
      </div>
    )
  }

  makeSystem = () => {
    const system = new System();
    console.log(system);
  }
}

