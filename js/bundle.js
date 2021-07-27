(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";

var firebaseConfig = {
  apiKey: "AIzaSyCDcfRlaYDRLzA8cVeSXfbh98HeVXoyR-c",
  authDomain: "claigsrist.firebaseapp.com",
  databaseURL: "https://claigsrist-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "claigsrist",
  storageBucket: "claigsrist.appspot.com",
  messagingSenderId: "927216397570",
  appId: "1:927216397570:web:c58e81522d3bc3ca60261b",
  measurementId: "G-PDP8VG2MSV"
};
firebase.initializeApp(firebaseConfig);


let database = firebase.database();

let ref = database.ref("Products");

let products= [];

const fs = require('fs');
},{"fs":1}]},{},[2]);
