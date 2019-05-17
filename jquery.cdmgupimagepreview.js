;(function($) {

  var defaults = {
    input: '[data-upImagePreview="input"]',
    image: '[data-upImagePreview="image"]',
    reset: '[data-upImagePreview="reset"]',
    type : ['gif', 'jpeg', 'png'],
    typeAlert: '選択できるファイルは%type%画像だけです。',
    limit: 1000,
    limitAlert: '選択できるファイルは%type%kbまでです。',
  };

  $.fn.upImagePreview = function(options) {
    var settings = $.extend({}, defaults, options);
    var reader = new FileReader();

    function fileReset() {
      $(settings.input)[0].value = '';
      $(settings.image).html('');
    }

    function fileChange(e) {
      var target = e.target;
      var file = target.files[0];
      var type = file.type;
      var size = file.size;

      if ( settings.type.indexOf(file.type.replace('image/', '')) === -1 ) {
        alert(settings.typeAlert.replace('%type%', settings.type));
        fileReset();
        return;
      }

      if ( settings.limit * 1000 < size ) {
        alert(settings.limitAlert.replace('%type%', settings.limit));
        fileReset();
        return;
      }

      reader.readAsDataURL(file);
    }

    function fileLoad() {
      $(settings.image).html('<img src=" ' + reader.result + '">');
    }

    $(settings.input)[0].addEventListener('change', fileChange, false);
    $(settings.reset)[0].addEventListener('click', fileReset, false);
    reader.addEventListener('load', fileLoad, false);

  };

})(jQuery);