import React from 'react';
import Masonry from 'react-masonry-component';

export default class Images extends React.Component {
  render() {
    var images = [];
    var key = 0;

    // データからimgタグを生成
    this.props.data.map(data => {
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
}
