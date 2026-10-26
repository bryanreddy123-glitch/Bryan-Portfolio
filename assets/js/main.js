/*
  Bryan Reddy portfolio interactions.
  Retains the original Future Imperfect menu and responsive intro behaviour.
*/
(function ($) {
  'use strict';

  var $window = $(window);
  var $body = $('body');
  var $menu = $('#menu');
  var $sidebar = $('#sidebar');
  var $main = $('#main');
  var $intro = $('#intro');

  // Responsive breakpoints used by the original HTML5 UP template.
  breakpoints({
    xlarge: ['1281px', '1680px'],
    large: ['981px', '1280px'],
    medium: ['737px', '980px'],
    small: ['481px', '736px'],
    xsmall: [null, '480px']
  });

  // Remove the page-load animation guard once the page is ready.
  $window.on('load', function () {
    window.setTimeout(function () {
      $body.removeClass('is-preload');
    }, 100);
  });

  // Keep the template's slide-out navigation panel.
  if ($menu.length && typeof $menu.panel === 'function') {
    $menu.appendTo($body).panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: 'right',
      target: $body,
      visibleClass: 'is-menu-visible'
    });
  }

  // On smaller screens, move the profile intro above the main content.
  if ($intro.length && $main.length && $sidebar.length && typeof breakpoints.on === 'function') {
    breakpoints.on('<=large', function () {
      $intro.prependTo($main);
    });

    breakpoints.on('>large', function () {
      $intro.prependTo($sidebar);
    });
  }

  // Keep the copyright year current without requiring a backend.
  $('#current-year').text(new Date().getFullYear());

  // Close the mobile panel after navigating to an on-page section.
  // The original panel also has hideOnClick enabled; this is an extra
  // keyboard- and touch-friendly fallback for links inside the menu.
  $('#menu a[href^="#"]').on('click', function () {
    window.setTimeout(function () {
      $body.removeClass('is-menu-visible');
    }, 50);
  });

})(jQuery);
