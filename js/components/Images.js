import React from 'react';
import Masonry from 'react-masonry-component';
import jsonp from 'jsonp'

export default class Images extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      data: []
    };

    this.fetch = this.fetch.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.handleImagesLoaded = this.handleImagesLoaded.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    var images = [];
    var key = 0;

    // データからimgタグを生成
    this.state.data.map(data => {
      data.photos.map(photo => {
        images.push(
          <div key={key} className="grid-item">
            <img src={photo.alt_sizes[0].url} />
          </div>
        );
        key++;
      });
    });

    let masonryOptions = {
      transitionDuration: 0
    };

    return (
      <Masonry
        className={'grid'}
        options={masonryOptions}
        onImagesLoaded={this.handleImagesLoaded}>
        { images }
      </Masonry>
    )
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
        data: this.shuffle(this.state.data.concat(data.response.posts))
      });
    }.bind(this));
  }

  // Masonry loaded
  handleImagesLoaded(imagesLoadedInstance) {
    this.props.onCompleteLoading();
  }

  shuffle(array) {
    let n = array.length;
    var shuffled = [];

    while (n) {
      let i = Math.floor(Math.random() * array.length);
      if (i in array) {
        shuffled.push(array[i]);
        delete array[i];
        n--;
      }
    }

    return shuffled;
  }
}
