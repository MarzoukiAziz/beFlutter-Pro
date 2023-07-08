const express = require('express')
const router = express.Router()
const dartController = require("../controllers/dartController")
const checkUser = require("../controllers/userController").checkCookieMiddlewareForContent;


router.get("/:chapiter/:lesson", checkUser, dartController.getDartLesson)

router.get("/", checkUser, dartController.getMainDartPage)

module.exports = router;