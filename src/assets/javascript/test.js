let { HttpClient } = require('@angular/common/http');
const { logging } = require('protractor');
const http = new XMLHttpRequest();

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    http.open('GET', 'http://localhost:3000/asd123', true);
    http.send(null)

    var id_token = googleUser.getAuthResponse().id_token;
    console.log('Token', id_token);
}

function changeLogInHandler(){
    // gapi.auth2.getAuthInstance().attachClickHandler(document.getElementById('testeoHandler'), {})
    console.log('1')
}

function logIn(){
    console.log('2')
}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
}