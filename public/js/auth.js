// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCi3Kwi3ESW0DwgOzqDsw0qoE0Mqe7iY1Y",
    authDomain: "flutter-pro-51469.firebaseapp.com",
    databaseURL: "https://flutter-pro-51469.firebaseio.com",
    projectId: "flutter-pro-51469",
    storageBucket: "flutter-pro-51469.appspot.com",
    messagingSenderId: "928732786533",
    appId: "1:928732786533:web:832d8d74c6688e561fbb8c",
    measurementId: "G-08KVRCRMY0"
};
firebase.initializeApp(firebaseConfig);


// As httpOnly cookies are to be used, do not persist any state client side.
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);


// FirebaseUI config.
var uiConfig = {
    signInOptions: [
        // google sign in option
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            requireDisplayName: false
        },
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],

    // Terms of service url/callback.
    tosUrl: '#',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
        window.location.assign('#');
    },
    signInFlow: 'popup',
    callbacks: {
        signInSuccess: function (user, credential, redirectUrl) {
            // User successfully signed in.
            user.getIdToken().then(function (idToken) {
                window.location.href = '/sessionLogin?idToken=' + idToken;
            }).catch(error => {
                alert(error);
            })

        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    }
};


// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);