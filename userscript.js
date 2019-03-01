// ==UserScript==
// @name         Enhanced Github
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world with ES6!
// @author       Hrusikesh Panda
// @match        https://github.com/*/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js
// ==/UserScript==

/* jshint asi: true, esversion: 6, esnext: false */
(() => {
    "use strict"

    const $ = window.jQuery

    const styles = `

      .reponav-item .octicon,
      .numbers-summary .octicon,
      .overall-summary,
      .repository-lang-stats-graph,
      .pagehead-actions li:nth-of-type(2n+1) .social-count,
      .btn-link.f6 {
        display: none !important;
      }

      #topics-list-container { margin-bottom: 0 !important; }
      .repository-topics-container { margin-bottom: 0 !important; margin-top: 0 !important; }
`
    // take care of ugly styles
    $('head').append(`<style type="text/css">${styles}</style>`)

    // move description
    if($('#repo-meta-edit').length) { // repo owner
        $('.repohead-details-container h1').after($('#repo-meta-edit').detach())
        $('.repohead-details-container h1').after($('#topics-list-container').detach())
    } else {
        $('.repohead-details-container h1').after($('.repository-content .f4').detach())
        $('.repohead-details-container h1').after($('.repository-topics-container').detach())
    }

    const getNavItem = (href, text, counter) => `<a itemprop="url" class="js-selected-navigation-item reponav-item" href="${href}" style="text-transform: capitalize;"><span itemprop="name">${text}</span><span class="Counter">${counter}</span></a>`

    const items = $('.numbers-summary li').slice(0, 3).map((i, el) => getNavItem($(el).find('a').attr('href'), $(el).find('a').contents().last().text().trim(), $(el).find('.num').text().trim())).get()

    $('.reponav span:first').after(items)

})();
