$(function() {
  var url = 'https://api.tumblr.com/v2/blog/tumblr.star-zero.com/posts?api_key=m2ScFhIfturGIHlhEXNKUNQct4EiWFj9u2Z4ZmpenREwG71oGZ&type=photo&jsonp=?&offset=';
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
    $.getJSON(url + offset).done(function(data) {
      if (data.meta.status != 200) {
        return;
      }
      $(data.response.posts).each(function() {
        $(this.photos).each(function() {
          var index = 2;
          if (this.alt_sizes.length < 3) {
            index = 0;
          }
          images.push(this.alt_sizes[index].url);
        });
      });
    }).complete(function() {
      apiCount++;
      if (apiCount == maxApiCount) {
        montage();
      }
    });
  }

  function montage() {
    var total = images.length;
    var count = 0;

    $('#circleG').fadeOut(1000);

    if (total === 0) {
      return;
    }

    images = _.shuffle(images);

    var indexes = [];
    $.each(images, function(i, val) {
      indexes.push(i);
      $a = $('<a/>');
      $image = $('<img/>').attr('src', val).hide().load(function() {
        loadImage();
      }).error(function() {
        // image load error
        $(this).remove();
        loadImage();
      });

      // image load timeout
      setTimeout(function(image) {
        return function() {
          if (!image.complete) {
            $(image).error();
          }
        };
      }($image[0]), 3000);

      $a.append($image);
      $container.append($a);
    });

    function loadImage() {
      count++;
      if (count == total) {

        // stop loading
        if (window.stop !== undefined) {
          window.stop();
        } else if (document.execCommand !== undefined) {
          document.execCommand("Stop", false);
        }

        var $containerImages = $container.find('img');
        $containerImages.show();
        $container.montage({
          fillLastRow: true,
          fixedHeight: 200,
          margin: 0
        });
        $containerImages.hide();
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
    }
  }

  for (var i = 0; i < maxApiCount; i++) {
    callTumblrApi();
    offset += 20;
  }

  $('.inner').fadeIn(3500);
  $('#circleG').fadeIn(3500);
});
