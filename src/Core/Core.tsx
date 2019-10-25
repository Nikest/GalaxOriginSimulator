import * as React from 'react';
import { cd, getNamesInStyle } from 'Services';
import { System } from 'Astro';

@cd(() => require('./Core.scss'))
export class Core extends React.Component {
  state = {
    system: null
  };

  classTranslate = (str: string) => {
    if (str === 'star') return 'Звезда';
    if (str === 'planet') return 'Планета';
    if (str === 'moon') return 'Луна';
    return str;
  };

  typeTranslate = (str: string) => {
    if (str === 'jovian') return 'газовый гигант';
    return str;
  };

  render(c?) {
    const makeCell = (centralBody) => { console.log(centralBody);
      return (
          <div className={c('wrapper')}>
              <div className={c(`decor ${centralBody.class}`)}/>
              <p><b>{centralBody.name}</b></p>
              <p>{this.classTranslate(centralBody.class)} {this.typeTranslate(centralBody.type)}</p>
          </div>
      )
    };

    const makeRow = (barycenter) => {
      return (
          <div className={c('browser')}>
            { makeCell(barycenter.centralBody) }

            {
              barycenter.orbits.map(b => {
                  return makeCell(b.centralBody)
              })
            }
          </div>
      )
    };

    const { system } = this.state;
    if (!system) return <button onClick={this.makeSystem}>make system</button>;

    return (
      <div className={c('container')}>
        <button onClick={this.makeSystem}>make system</button>


          <div className={c('horizontal')}>
              <div className={c('cell')}>{ makeCell(system.system.centralBody) }</div>

              {
                  system.system.orbits.map(barycenter => {
                      return (
                          <div className={c('cell')}>
                              { makeCell(barycenter.centralBody) }
                              {
                                  barycenter.orbits.length && (
                                      <div className={c('vertical')}>
                                          { barycenter.orbits.map(bmoon => {
                                              return <div className={c('cell')}>
                                                  { makeCell(bmoon.centralBody) }
                                              </div>
                                          }) }
                                      </div>
                                  )
                              }
                          </div>

                      )
                  })
              }
          </div>
      </div>
    )
  }

  makeSystem = () => {
    const system = new System();
    console.log(system);
    this.setState({system})
  }
}

