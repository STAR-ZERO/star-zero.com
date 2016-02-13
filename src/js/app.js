$(function() {
  var url = 'https://api.tumblr.com/v2/blog/tumblr.star-zero.com/posts?api_key=m2ScFhIfturGIHlhEXNKUNQct4EiWFj9u2Z4ZmpenREwG71oGZ&type=photo&jsonp=?&offset=';
  var offset = 0;

  var $container = $('#am-container');
  var images = [];

  var maxApiCount = 3;
  var limitApiCount = 8;
  var apiCount = 0;

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
      if (apiCount >= maxApiCount) {
        montage();
      }
    });
  }

  function montage() {
    var total = images.length;
    var count = 0;

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
        $('#am-container').montage({
          fillLastRow: true,
          fixedHeight: 200,
          margin: 0
        });

        if ($(window).height() < $container.height() || apiCount >= limitApiCount) {
          // 高さが足りているか、API制限を超えたら表示

          $('#circleG').fadeOut(1000);

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

        } else {
          // 高さが足りていない場合は一度削除してAPIを呼び直す
          // emptyで子要素のみを削除したらうまく動かなかったので再作成している

          $container.remove();
          $container = $('<div class="am-container" id="am-container"/>');
          $('body').append($container);

          callTumblrApi();
          offset += 20;
        }
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
