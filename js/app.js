$(function() {
  var url = 'http://api.tumblr.com/v2/blog/tumblr.star-zero.com/posts?api_key=m2ScFhIfturGIHlhEXNKUNQct4EiWFj9u2Z4ZmpenREwG71oGZ&type=photo&jsonp=?&offset='
  var offset = 0;

  var $container = $('#am-container');
  var images = [];

  var maxApiCount = 3;
  var apiCount = 0;

  // windowの高さで取得件数を変える（かなりアバウト）
  var windowHeight = $(window).height();
  if (windowHeight > 800) {
      maxApiCount = 5;
  } else if (windowHeight > 800) {
      maxApiCount = 4;
  }

  function callTumblrApi() {
    $.getJSON(url + offset, function(data) {
      if (data.meta.status != 200) {
        return;
      }
      $(data.response.posts).each(function() {
        $(this.photos).each(function() {
          var index = 2;
          if (this.alt_sizes.length < 3) {
            index = 0
          }
          images.push(this.alt_sizes[index].url);
        });

      });
      apiCount++;
      if (apiCount == maxApiCount) {
          montage();
      }
    });
  }

  function montage() {
    var total = images.length;
    var count = 0;

    images = _.shuffle(images);

    var indexes = [];
    $.each(images, function(i, val) {
      indexes.push(i);
      $a = $('<a/>');
      $image = $('<img/>').attr('src', val).hide().load(function() {
        count++;
        if (count == total) {
          var $containerImages = $container.find('img');
          $('.loading').hide();
          $containerImages.show();
          $container.montage({
            fillLastRow: true,
            alternateHeightRange: {
              min: 90,
              max: 240
            },
            margin: 0
          });
          $containerImages.hide();
          $('.inner').fadeIn(3500);
          $(document.documentElement).css('overflow', 'hidden');

          var delay = 1000;
          indexes = _.shuffle(indexes);
          $.each(indexes, function(i, val) {
            setTimeout(function() {
              $($containerImages[val]).fadeIn(1500);
            }, delay);
            delay += 40;
          });
        }
      });
      $a.append($image);
      $container.append($a);
    });
  }

  for (var i = 0; i < maxApiCount; i++) {
      callTumblrApi();
      offset += 20;
  }
});
