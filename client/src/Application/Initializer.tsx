import * as React from 'react';
import { Config, requester } from 'Services';

export class Initializer extends React.Component<{children: any}> {
  componentWillMount() {

  }

  render() {
    return this.props.children
  }

  componentDidMount(): void {
    require('Themes/default/theme.scss');

    const theme = Config.get('THEMES');
    document.body.classList.add(`theme-${theme}`);

  }
}
