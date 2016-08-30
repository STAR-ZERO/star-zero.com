import React from 'react';

import Loading from '../components/Loading'
import Overlay from '../components/Overlay'
import Link from '../components/Link'
import Images from '../components/Images'
import { run } from '../app.js'

export default class App extends React.Component {
  componentDidMount() {
    run()
  }

  render() {
    return (
      <div>
        <Loading />
        <Overlay />
        <Link />
        <Images />
      </div>
    )
  }
}

