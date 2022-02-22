////////// 3D MODELS //////////
////////// 3D MODELS //////////
////////// 3D MODELS //////////
////////// 3D MODELS //////////
////////// 3D MODELS //////////
////////// 3D MODELS //////////
////////// 3D MODELS //////////
////////// 3D MODELS //////////
////////// 3D MODELS //////////
////////// 3D MODELS //////////
(function($){
  $.fn.goTo3d = function(options){
    'use strict';

    var $listItems = $('ul', this).children(),
        settings = $.extend({}, $.fn.goTo3d.defaults, options),
        obj3d = $(this),
        sections = [];

    function type3d(img) {

      var sizeIt,
          dividend = img.length;
          // прокручивание страницы
      if (settings.type === 'scroll') {
        sizeIt = $(window).height();
        // прокручивание верх - вниз
      } else if (settings.type === 'y') {
        sizeIt = obj3d.height();
        // нормальное по x
      } else {
        sizeIt = obj3d.width();
      }

      var sectionSize = sizeIt / dividend;

      // масив со значениями
      for (var i = 0; i < img.length; i++) {
        sections[i] = {
          min: sectionSize * i,
          max: sectionSize + (sectionSize * i),
          index: i
        };
      }

      // reverse
      if (settings.reverse === true) {
        // сам reverse
        sections.reverse();
        // перебить все индексы
        $.each(sections, function(i, obj) {
          obj.index = i;
        });
      }
    }

    // загрузка картинок
    (function appendImages(callback) {
      $listItems.each(function () {
        $(this).html('<img src="' + $(this).data("imgSrc") + '">');
      });
    })();

    // загрузка только одной картинки
    $("li:first-child>img", obj3d).load(function () {
      $(this).parent().addClass('active');
      type3d($listItems);
    });

    // разделение окна на части
    $(window).resize(function(){
      type3d($listItems);
    });

    // найти нужный деапазон
    var applyClasses = function(sections, position) {
      $.each(sections, function () {
        if (position >= this.min && position <= this.max) {
          $listItems.removeClass('active');
          $listItems.eq(this.index).addClass("active");
        }
      });
    };

    // для прокручивания
    if (settings.type === 'scroll'){
      return $(window).scroll(function(){
        var scroll;
        if (settings.scroll === 'bottom') {
          scroll = obj3d.height();
        } else if (settings.scroll === 'top') {
          scroll = 0;
        } else {
          scroll = obj3d.height() / 2;
        }
        var offset = obj3d.offset();
        var position = offset.top - ( $(window).scrollTop() - scroll );
        applyClasses(sections, position);
      });

    } else {
      // по наведению на обьекта
      return obj3d.on("mousemove", function (e) {
        var offset = $(this).offset();
        var position;
        if (settings.type === 'y') {
          position = e.pageY - offset.top;
        } else {
          position = e.pageX - offset.left;
        }
        applyClasses(sections, position);
      });

    }
  };
  //дефолтные настройки
  $.fn.goTo3d.defaults = {
    type: 'x',
    reverse: false,
    scroll: 'middle'
  };

})(jQuery);
