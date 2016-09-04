import React from 'react';

import Loading from '../components/Loading'
import Overlay from '../components/Overlay'
import Link from '../components/Link'
import Background from './Background'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      completedLoading: false
    };

    this.handleCompletedLoading = this.handleCompletedLoading.bind(this);
  }

  render() {
    return (
      <div>
        <Loading completedLoading={this.state.completedLoading} />
        <Overlay />
        <Link completedLoading={this.state.completedLoading} />
        <Background onCompleteLoading={this.handleCompletedLoading} />
      </div>
    )
  }

  handleCompletedLoading() {
    if (this.state.completedLoading) {
      return;
    }
    this.setState({
      completedLoading: true
    });
  }
}

