(function($) {
  'use strict';
  

  // Caching Selectors
  var $window = $(window);
  var $navBar = $('#navbar');
  var $asideNav = $('#aside-nav');

  function initNavbar() {
    $navBar.find('.navigation-menu>li').slice(-2).addClass('last-elements');

    $('.menu-toggle, .toggle-nav').on('click', function(event) {
      event.preventDefault();
      if ($window.width() < 992) {
        $(this).find('.hamburger').toggleClass('is-active');

        $('#navigation').slideToggle(400);
        $navBar.find('.cart-open').removeClass('opened');
      }
    });

    $.merge($navBar, $asideNav).on('click', '.navigation-menu li.menu-item-has-children>a', function(e) {
      if ($window.width() < 992) {
        e.preventDefault();
        $(this).parent('li').toggleClass('opened').find('.submenu:first').slideToggle();
      }
    });

  }


  function initGeneral() {
    $('.toggle-nav').on('click', function(event) {
      if ($window.width() > 991) {
        $(this).find('.hamburger').toggleClass('is-active');
        $asideNav.toggleClass('is-active');
      }
    });

    $asideNav
      .on('click', '.navigation-menu >li.menu-item-has-children>a', function(e) {
        if ($window.width() > 991) {
          e.preventDefault();
          $('.navigation-menu>li').not($(this).parent('li')).find('.submenu').slideUp(300);
          $(this).parent('li').find('ul:first').slideToggle(300);
        }
      })
      .on(
        'click',
        '.submenu>li.menu-item-has-children>a, .sub-menu>li.menu-item-has-children>a',
        function(e) {
          if ($window.width() > 991) {
            e.preventDefault();
            $('.navigation-menu .submenu>li')
              .not($(this).parent('li'))
              .find('.submenu')
              .slideUp(300);
            $('.navigation-menu .submenu>li')
              .not($(this).parent('li'))
              .find('.sub-menu')
              .slideUp(300);
            $(this).parent('li').find('ul:first').slideToggle(300);
          }
        }
      );
  }

  function iniT(){
    initGeneral();
    initNavbar();
  }
  iniT();
})(jQuery);
