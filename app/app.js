"use strict";

var app = new Vue({
  el: '#app',
  data: {
    message: 'Loading...'
  },
  methods: {
    onSignOut: function () {
      this.auth2 = gapi.auth2.getAuthInstance()
      this.auth2.signOut().then( () => {
        this.auth2.disconnect()
        console.log('User signed out.')
      })
    }
  }
})

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile()
  console.log('Id: ' + profile.getId())  
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  console.log('Token: ' + googleUser.getAuthResponse().id_token);
}

function onSignOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut();
  auth2.disconnect();
}