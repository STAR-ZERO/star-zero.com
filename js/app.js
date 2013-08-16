$(function() {
  var url = 'http://api.tumblr.com/v2/blog/tumblr.star-zero.com/posts?api_key=m2ScFhIfturGIHlhEXNKUNQct4EiWFj9u2Z4ZmpenREwG71oGZ&type=photo&jsonp=?&offset='
  var offset = 0;

  var $container = $('#am-container');
  var images = [];

  // windowの高さで取得件数を変える（かなりアバウト）
  var maxCount = 60;
  var windowHeight = $(window).height();
  if (windowHeight > 800) {
      maxCount = 100;
  } else if (windowHeight > 800) {
      maxCount = 80;
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

      offset += 20;
      if (offset < maxCount) {
        callTumblrApi();
      } else {
        montage();
      }
    });
  }

  function montage() {
    var total = images.length;
    var count = 0;

    $.each(images, function(i, val) {
      $a = $('<a/>');
      $image = $('<img/>').attr('src', val).hide().load(function() {
        count++;
        if (count == total) {
          $('.loading').hide();
          $container.find('img').show();
          $container.montage({
            fillLastRow: true,
            alternateHeightRange: {
              min: 90,
              max: 240
            },
            margin: 0
          });
          $('.inner').fadeIn(3000);
          $(document.documentElement).css('overflow', 'hidden');
        }
      });
      $a.append($image);
      $container.append($a);
    });
  }

  callTumblrApi();
});

