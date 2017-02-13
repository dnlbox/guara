"use strict";

var app = new Vue({
  el: '#app',
  data: {
    message: 'Loading...'
  },
  methods: {
    compute: function(message) { console.log(message) }
  }
})

console.log('loading...');

