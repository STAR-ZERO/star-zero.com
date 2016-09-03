import React from 'react';

import Loading from '../components/Loading'
import Overlay from '../components/Overlay'
import Link from '../components/Link'
import Background from './Background'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Loading />
        <Overlay />
        <Link />
        <Background />
      </div>
    )
  }
}

