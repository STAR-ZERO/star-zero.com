import React from 'react';

export default class Images extends React.Component {
  render() {
    var images = [];
    var key = 0;

    // データからimgタグを生成
    this.props.data.map(data => {
      data.photos.map(photo => {
        images.push(
          <img key={key} src={photo.alt_sizes[0].url} />
        );
        key++;
      });
    });
    return (
      <div>
        { images }
      </div>
    )
  }
}



