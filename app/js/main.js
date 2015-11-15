'use strict'
window.$ = window.jQuery = require('jquery');
var fullpage = require('fullpage.js');
$(function() {
  $('#fullpage').fullpage({
    verticalCentered: true,
    anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8', 'page9'],
    navigation: true
  });
})