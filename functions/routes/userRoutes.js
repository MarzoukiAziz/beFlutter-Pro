const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")



router.route("/")
    .get(userController.getHome)
router.route("/web-quiz").get((req, res) => {
    res.render("web_quiz");
})

router.route("/contact")
    .get(userController.getContactForm)

router.route("/signIn")
    .get(userController.getSignInForm)

router.route("/sessionLogin")
    .get(userController.sessionLogin)

router.route("/dashboard")
    .get(userController.checkCookieMiddleware, userController.dashboard)

router.route("/signout")
    .get(userController.signOut)

router.route("/editData")
    .get(userController.checkCookieMiddleware, userController.getEditData)
    .post(userController.checkCookieMiddleware, userController.updateData)

router.route("/updateLessonProgress")
    .post(userController.checkCookieMiddleware, userController.updateLessonProgress)


module.exports = router;