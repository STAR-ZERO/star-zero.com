import React from 'react';

import Loading from '../components/Loading'
import Overlay from '../components/Overlay'
import Link from '../components/Link'
import Images from '../components/Images'

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
        <Images onCompleteLoading={this.handleCompletedLoading} />
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

