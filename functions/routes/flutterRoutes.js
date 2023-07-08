const express = require('express')
const router = express.Router()
const flutterController = require("../controllers/flutterController")
const checkUser = require("../controllers/userController").checkCookieMiddlewareForContent;


router.get("/:chapiter/:lesson", checkUser, flutterController.getFlutterLEsson)

router.get("/", checkUser, flutterController.getMainFlutterPage)

module.exports = router;