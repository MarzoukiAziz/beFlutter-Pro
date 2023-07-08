const { FlutterContent } = require("../data/sections")

module.exports.getMainFlutterPage = (req, res) => {
    res.render("layout/contentViewer", { data: FlutterContent, section: "flutter", chapiter: null, lesson: null, ref: "flutter", userData: req.userData })
}

module.exports.getFlutterLEsson = (req, res) => {
    var ch = req.params.chapiter;
    var les = req.params.lesson;

    if (les == "ex" && FlutterContent[ch].exercise) {
        res.render("layout/contentViewer", {
            data: FlutterContent, section: "flutter", chapiter: FlutterContent[ch - 1].chapiter, lesson: "Exercises", ref: ch + "." + les, ch: ch,
            les: les,
            userData: req.userData
        });
    }
    if ((les < 1) || (les > FlutterContent[ch - 1].lessons.length) || (les == "ex" && FlutterContent[ch - 1].exercise == false)) {
        res.send("Not Found")
    } else {
        res.render("layout/contentViewer", {
            data: FlutterContent,
            section: "flutter",
            chapiter: FlutterContent[ch - 1].chapiter,
            lesson: FlutterContent[ch - 1].lessons[les - 1],
            ref: ch + "." + les,
            ch: ch,
            les: les,
            userData: req.userData
        });

    }

}

