/**
 * Entrypoint
 */
import glogon from './scripts/utils/google-login'

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
