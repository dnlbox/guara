"use strict";

Vue.component('timecomponent', {
  template: '<div>{{currentTime}}</div>',
  data: function () {
    return {
      currentTime: Date()
    }
  }
})

new Vue({
  el:'#time'
})