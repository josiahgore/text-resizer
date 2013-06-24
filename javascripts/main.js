jQuery(function($) {
  $('#container_width').val(parseInt($('#try_it_out_container').css('width')));

  var resizeIt = function() {
    $('#try_it_out_container')
        .css('width', $('#container_width').val())
        .css('height', $('#container_height').val())
        .text($('#text_to_fit').text())
        .resizeToFit();
  }

  $('#text_to_fit').blur(resizeIt);
  $('#container_width,#container_height').spinner({
    step: 25,
    change: resizeIt,
    stop: resizeIt
  });

  resizeIt();

});

