import React from 'react';
import jsonp from 'jsonp'

import Images from '../components/Images'

export default class Background extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      data: []
    };

    this.fetch = this.fetch.bind(this);
    this.handleImagesLoaded = this.handleImagesLoaded.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    return (
        <div>
          <Images data={this.state.data} onImagesLoaded={this.handleImagesLoaded} />
        </div>
    );
  }

  // tumblrから画像データ取得
  fetch() {
    let url = 'https://api.tumblr.com/v2/blog/tumblr.star-zero.com/posts?api_key=m2ScFhIfturGIHlhEXNKUNQct4EiWFj9u2Z4ZmpenREwG71oGZ&type=photo&offset=';

    jsonp(url + this.state.offset, {
      param: 'jsonp'
    }, function(err, data) {
      if (err || data.meta.status != 200) {
        return;
      }

      this.setState({
        offset: this.state.offset + 1,
        data: this.state.data.concat(data.response.posts)
      });
    }.bind(this));
  }

  handleImagesLoaded() {
    this.props.onCompleteLoading();
  }
}


