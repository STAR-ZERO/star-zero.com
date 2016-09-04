import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Loading extends React.Component {
  render() {
    var loading = '';
    if (!this.props.completedLoading) {
      loading = (
        <div id="circleG" className={this.props.completedLoading ? 'hidden' : ''}>
          <div id="circleG_1" className="circleG"></div>
          <div id="circleG_2" className="circleG"></div>
          <div id="circleG_3" className="circleG"></div>
        </div>
      );
    }

    return (
      <ReactCSSTransitionGroup transitionName="loading" transitionAppear={false} transitionEnter={false} transitionLeave={true} transitionLeaveTimeout={2000}>
        {loading}
      </ReactCSSTransitionGroup>
    )
  }
}
