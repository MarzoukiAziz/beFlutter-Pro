const functions = require('firebase-functions');
const express = require('express');
const cookieParser = require("cookie-parser");
const ejsEngine = require("ejs-mate");


const dartRoutes = require("./routes/dartRoutes")
const userRoutes = require('./routes/userRoutes')
const flutterRoutes = require("./routes/flutterRoutes")



const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }))
app.engine("ejs", ejsEngine)
app.set("views", "./views");
app.use(cookieParser());


app.use('/dart', dartRoutes)
app.use('/flutter', flutterRoutes)
app.use('/', userRoutes)

exports.app = functions.https.onRequest(app);
