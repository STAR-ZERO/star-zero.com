import React from 'react';
import update from 'react-addons-update';
import Masonry from 'react-masonry-component';
import jsonp from 'jsonp'

export default class Images extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      offset: 0,
      photos: [],
      completeImageLoaded: false
    };

    this.fetch = this.fetch.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.handleImagesLoaded = this.handleImagesLoaded.bind(this);
    this.isCompleteFetchAPI = this.isCompleteFetchAPI.bind(this);
    this.imageRandomFadein = this.imageRandomFadein.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.photos.length == this.state.photos.length) {
      return false;
    }
    return this.isCompleteFetchAPI(nextState);
  }

  render() {
    var images = [];
    var key = 0;

    // データからimgタグを生成
    this.state.photos.map(photo => {
      images.push(
        <div key={key} className="grid-item">
          <img src={photo.alt_sizes[0].url} ref={"images" + key} />
        </div>
      );
      key++;
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

      // expand photo
      var photos = [];
      data.response.posts.map(data => {
        data.photos.map(photo => {
          photos.push(photo);
        });
      });

      this.setState({
        page: this.state.page + 1,
        offset: this.state.offset + 20,
        photos: this.shuffle(this.state.photos.concat(photos))
      });

      if (!this.isCompleteFetchAPI(this.state)) {
        this.fetch();
      }

    }.bind(this));
  }

  // Masonry loaded
  handleImagesLoaded(imagesLoadedInstance) {
    // Somehow this method is called two time, so it check state
    if (this.isCompleteFetchAPI(this.state) && !this.state.completeImageLoaded) {
      this.props.onCompleteLoading();

      let newState = update(this.state, {
        completeImageLoaded: {
          $set: true
        }
      });
      this.setState(newState);

      this.imageRandomFadein();
    }
  }

  imageRandomFadein() {
    var images = [];
    for (var i = 0; i < this.state.photos.length; i++) {
      images.push(this.refs["images" + i]);
    }

    // ランダムにフェードインで表示
    let shuffledImages = this.shuffle(images);
    var delay = 1000;
    shuffledImages.map(image => {
      setTimeout(() => {
        image.className = 'fadein';
      }, delay);
      delay += 60;
    });
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

  isCompleteFetchAPI(state) {
    return state.page >= 3;
  }
}
