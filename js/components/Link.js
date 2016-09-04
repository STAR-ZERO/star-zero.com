import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Link extends React.Component {
  render() {
    return (
      <ReactCSSTransitionGroup transitionName="link" transitionAppear={true} transitionEnter={false} transitionLeave={false} transitionAppearTimeout={2000}>
        <div className='inner'>
          <h1>STAR-ZERO</h1>
          <div className="link">
            <a href="https://twitter.com/STAR_ZERO" target="_blank"><img src="img/twitter.png" width="60" height="60" /></a>
            <a href="https://github.com/STAR-ZERO" target="_blank"><img src="img/github.png" width="60" height="60" /></a>
            <a href="http://starzero.hatenablog.com/" target="_blank"><img src="img/hatenablog.png" width="60" height="60" /></a>
            <a href="http://www.amazon.co.jp/registry/wishlist/2PFG3VL74AWWJ" target="_blank"><img src="img/amazon.png" width="60" height="60" /></a>
            <a href="http://tumblr.star-zero.com/" target="_blank"><img src="img/tumblr.png" width="60" height="60" /></a>
            <a href="http://qiita.com/STAR_ZERO" target="_blank"><img src="img/qiita.png" width="60" height="60" /></a>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
}


