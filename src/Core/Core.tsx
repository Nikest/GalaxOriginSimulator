import * as React from 'react';
import { cd, getNamesInStyle } from 'Services';
import { System } from 'Astro';

const bg = require('./bg.jpg');

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
    if (str === 'selena') return 'селена';
    if (str === 'subterra') return 'мини терра';
    if (str === 'terra') return 'терра';
    if (str === 'superterra') return 'супер-земля';
    if (str === 'neptunian') return 'субгигант';
    if (str === 'jovian') return 'газовый гигант';
    return str;
  };

  makeClassFromType = (type: string) => {
    if (type.length === 3) {
      return type[0]
    }

    return type
  };

  getSize = (radius: number, classType: string) => {
    if (classType === 'star') {
      return radius / (6.957 * 10e8) + ' радиусов Солнца'
    }

    return radius / 6371000 + ' радиусов Земли'
  };

  getMass = (mass: number, classType: string, type: string) => {
    if (classType === 'star') {
      return (mass / (2 * 10e30)).toPrecision(2) + ' масс Солнца'
    }

    if (type === 'neptunian' || type === 'jovian') {
      return (mass / 1.898e27).toPrecision(2) + ' масс Юпитера'
    }

    return (mass / (5.9726 * 10e24)).toPrecision(2) + ' масс Земли'
  };

  render(c?) {
    const makeCell = (centralBody) => {
      return (
          <div className={c('wrapper')}>
            <div className={c(`graph ${centralBody.class}`)}>
              <div className={c(`decor ${centralBody.class} ${this.makeClassFromType(centralBody.type)}`)}/>
            </div>
            <div>
              <p className={c('title')}>{centralBody.name}</p>
              <div className={c('description')}>
                <p>{this.classTranslate(centralBody.class)}</p>
                <p>Класс: <b>{this.typeTranslate(centralBody.type)}</b></p>
                <p>Размер: {this.getSize(centralBody.radius, centralBody.class)}</p>
                <p>Масса: {this.getMass(centralBody.mass, centralBody.class, centralBody.type)}</p>
                <p>Радиус орбиты: {centralBody.barycenter.selfOrbit.A}</p>
              </div>
            </div>
          </div>
      )
    };

    const { system } = this.state;
    if (!system) return <button className={c('button')} onClick={this.makeSystem}>Создать новую систему</button>;

    return (
      <div className={c('container')} style={{background: `url(${bg})`}}>
        <button className={c('button')} onClick={this.makeSystem}>Создать новую систему</button>


          <div className={c('horizontal')}>
              <div className={c('cell')}>{ makeCell(system.system.centralBody) }</div>

              {
                  system.system.orbits.map((barycenter, i) => {
                      return (
                          <div key={i} className={c('cell')}>
                              { makeCell(barycenter.centralBody) }
                              {
                                  !!barycenter.orbits.length && (
                                      <div className={c('vertical')}>
                                        <p className={c('type-descr')}>Луны: {barycenter.orbits.length}</p>
                                          { barycenter.orbits.map((bmoon, i) => {
                                              return <div key={i} className={c('cell')}>
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
    System.makeRandomSystem().then(system => this.setState({system}));
  }
}

