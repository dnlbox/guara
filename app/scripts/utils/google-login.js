export default {
  onSignIn: function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile()
    console.log('Id: ' + profile.getId())  
    console.log('Name: ' + profile.getName())
    console.log('Image URL: ' + profile.getImageUrl())
    console.log('Email: ' + profile.getEmail())
    console.log('Token: ' + googleUser.getAuthResponse().id_token)
  },
  onSignOut: function onSignOut() {
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut()
    auth2.disconnect()
  }
}