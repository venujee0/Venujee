// Firebase bootstrap for the Venu JEE static website.
// This web config is public by design. Firestore Security Rules and Auth
// must protect data; never place service-account credentials in this file.
(function () {
  "use strict";

  var config = {
    apiKey: "AIzaSyAQrFUSZtBMmos9mBlGOdh06ZFAX8XaLlg",
    authDomain: "venujee-94ac4.firebaseapp.com",
    projectId: "venujee-94ac4",
    storageBucket: "venujee-94ac4.firebasestorage.app",
    messagingSenderId: "977063325297",
    appId: "1:977063325297:web:27476ec20fb845b7e0f5d0",
    measurementId: "G-77E0YT8DBB"
  };

  try {
    if (!window.firebase) throw new Error("Firebase SDK did not load");
    var app = window.firebase.apps.length
      ? window.firebase.app()
      : window.firebase.initializeApp(config);

    window.VENU_FIREBASE = {
      app: app,
      auth: window.firebase.auth(),
      db: window.firebase.firestore(),
      analytics: null,
      ready: true
    };

    // Analytics is optional: some browsers block analytics storage or
    // do not support the required APIs. Core app loading must still work.
    if (window.firebase.analytics && window.firebase.analytics.isSupported) {
      window.firebase.analytics.isSupported().then(function (supported) {
        if (supported) {
          window.VENU_FIREBASE.analytics = window.firebase.analytics();
          window.VENU_FIREBASE.analytics.logEvent("venu_site_open");
        }
      }).catch(function (error) {
        console.warn("Venu JEE Analytics unavailable:", error);
      });
    }
    console.info("Venu JEE Firebase initialized");
  } catch (error) {
    window.VENU_FIREBASE = {
      app: null, auth: null, db: null, analytics: null,
      ready: false, error: error
    };
    console.error("Venu JEE Firebase initialization failed:", error);
  }
})();
