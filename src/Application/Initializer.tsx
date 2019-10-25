import * as React from 'react';

export class Initializer extends React.Component<{children: any}> {
  componentWillMount() {

  }

  render() {
    return this.props.children
  }

  componentDidMount(): void {

  }
}
