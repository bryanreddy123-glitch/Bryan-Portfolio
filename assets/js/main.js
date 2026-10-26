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

  // CSS handles layout breakpoints. Use matchMedia for intro relocation so
  // browser zoom reliably moves the profile between the sidebar and page top.

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

  // Keep the profile intro at the top on tablet/mobile and in the left
  // sidebar on wider layouts. Native matchMedia responds consistently to zoom.
  if ($intro.length && $main.length && $sidebar.length && window.matchMedia) {
    var introLayoutQuery = window.matchMedia('(max-width: 1280px)');

    function placeIntro() {
      if (introLayoutQuery.matches) {
        if ($intro.parent()[0] !== $main[0]) {
          $intro.prependTo($main);
        }
      } else if ($intro.parent()[0] !== $sidebar[0]) {
        $intro.prependTo($sidebar);
      }
    }

    placeIntro();

    if (typeof introLayoutQuery.addEventListener === 'function') {
      introLayoutQuery.addEventListener('change', placeIntro);
    } else if (typeof introLayoutQuery.addListener === 'function') {
      introLayoutQuery.addListener(placeIntro);
    }
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
