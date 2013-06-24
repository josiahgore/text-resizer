/**
 * jQuery extension to resize/reflow dynamic text to fit a space.
 * License: MIT (http://opensource.org/licenses/MIT)
 */
(function($) {
  $.fn.resizeToFit = function(options) {
    this.each(function() {
      var textBody = $(this);

      options = $.extend({
        width: textBody.css('width'),
        height: textBody.css('height'),
        scaleFactor: .8,
        text: textBody.text()
      }, options);
      options.width = parseInt(options.width);
      options.height = parseInt(options.height);

      var fontSize = parseInt(textBody.css('font-size'));
      var lineHeight = parseInt(textBody.css('line-height'));

      // create a hidden element with which to test overflow
      var resizer = $('<div/>')
          .prop('id', textBody.attr('id') + '_hidden_resizer')
          .css('font-size', fontSize + 'px')
          .css('line-height', lineHeight + 'px')
          .css('width', options.width)
          .text(options.text)
          .hide()
          .appendTo(document.body);

      // alternate between dropping font size and reducing line height until it no longer overflows
      var i = 0,
          lines = 1;
      while (resizer.height() > options.height) {
        if (i++ % 2 == 0) {
          fontSize *= options.scaleFactor;
          resizer.css('font-size', fontSize + 'px');
        } else {
          resizer.css('line-height', lineHeight / ++lines + 'px');
        }
      }

      // alright, should be good to propagate the style back to the original
      textBody.css('font-size', resizer.css('font-size'))
          .css('line-height', resizer.css('line-height'))
          .css('width', resizer.css('width'))
          .html(resizer.html());
    })
  }
})(jQuery);
