const admin = require('firebase-admin');

const serviceAccount = require("./../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://flutter-pro-51469.firebaseio.com"
});



module.exports.getHome = (req, res) => {
  res.render("landing.ejs");
}

module.exports.getContactForm = (req, res) => {
  res.render("others/contact")
}

module.exports.getSignInForm = (req, res) => {
  res.render("users/signin")
}

// route that sets a session cookie
module.exports.sessionLogin = (req, res) => {
  // Get the ID token passed.

  const idToken = req.query.idToken;
  setCookie(idToken, res);
}

function setCookie(idToken, res) {

  const expiresIn = 60 * 60 * 24 * 7 * 1000;
  admin.auth().createSessionCookie(idToken, { expiresIn }).then((sessionCookie) => {

    // Set cookie policy for session cookie and set in response.
    const options = { maxAge: expiresIn, httpOnly: true, secure: true };
    res.cookie('__session', sessionCookie, options);

    admin.auth().verifyIdToken(idToken).then(function (decodedClaims) {
      res.redirect('/dashboard');
    });

  }, error => {
    res.status(401).send('UNAUTHORIZED REQUEST!');
  });
}

module.exports.checkCookieMiddleware = (req, res, next) => {

  const sessionCookie = req.cookies.__session || '';

  admin.auth().verifySessionCookie(
    sessionCookie, true).then((decodedClaims) => {
      req.decodedClaims = decodedClaims;
      next();
    })
    .catch(error => {
      // Session cookie is unavailable or invalid. Force user to login.
      res.redirect('/signin');
    });
}


module.exports.checkCookieMiddlewareForContent = (req, res, next) => {

  const sessionCookie = req.cookies.__session || '';
  admin.auth().verifySessionCookie(sessionCookie, true)
    .then((decodedClaims) => {
      let uid = decodedClaims.uid;
      const dbRef = admin.database().ref();
      dbRef.child("users").child(uid).get().then((snapshot) => {
        if (snapshot.exists()) {
          var userData = snapshot.val();
          req.userData = userData;
        } else {
          req.userData = null;
        }
      }).catch((error) => {
        console.error(error);
        res.send(error.message)
      }).then(() => {
        next();
      })

    })
    .catch(error => {
      req.userData = null;
      next()
    });

}





module.exports.dashboard = (req, res) => {
  let uid = req.decodedClaims.uid;
  const dbRef = admin.database().ref();
  dbRef.child("users").child(uid).get().then((snapshot) => {
    if (snapshot.exists()) {
      var userData = snapshot.val();
      dp = (calculateProgress(userData.progress.dart) / 80);
      fp = (calculateProgress(userData.progress.flutter) / 90);
      res.render("users/dashboard", { userData: userData, dp: dp, fp: fp })
    } else {
      console.log("No data available");
      res.redirect("/editData")
    }
  }).catch((error) => {
    console.error(error);
    res.send(error.message)
  });

}

module.exports.signOut = (req, res) => {
  res.clearCookie('__session');
  res.redirect('/');
}

module.exports.getEditData = (req, res) => {
  let uid = req.decodedClaims.uid;
  const dbRef = admin.database().ref();
  dbRef.child("users").child(uid).get().then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      var userData = snapshot.val();
      res.render("users/editData", { uid: uid, userData: userData, set: '0' })
    } else {
      console.log("No data available");
      res.render("users/editData", { uid: uid, userData: null, set: '1' })
    }
  }).catch((error) => {
    console.error(error);
  });

}

module.exports.updateData = (req, res) => {
  let uid = req.decodedClaims.uid;
  let { username, fname, lname, avatar, set } = req.body;
  let data = {
    username: username,
    Plan: 1,
    avatar: avatar,
    email: req.decodedClaims.email,
    firstName: fname,
    lastName: lname,

  }

  if (set == '1') {
    data.progress = {
      dart: {
        c1: {
          test: false
        }
      },
      flutter: {
        c1: {
          test: false
        }
      }
    };
    admin.database().ref('users/' + uid).set(data);
  } else {
    admin.database().ref('users/' + uid).update(data);
  }
  res.redirect("/dashboard")
}


module.exports.updateLessonProgress = (req, res) => {
  try {
    var { section, ch, les } = req.body;
    var obj = {};
    var url = req.get('referer')
    obj[`${les}`] = true;
    admin.database().ref("users/" + req.decodedClaims.uid + "/progress/" + section + "/" + ch + "/").update(obj)
  }
  catch (e) {
    console.log(e.message)
  }
  res.redirect(url)
}

var calculateProgress = (data) => {
  var count = 0;
  for (i in data) {
    for (j in data[i]) {
      if (data[i][j]) count++;
    }
  }
  return count;
}

