const { DartContent } = require("../data/sections")
module.exports.getMainDartPage = (req, res) => {
	res.render("layout/contentViewer", { data: DartContent, section: "dart", chapiter: null, lesson: null, ref: "dart", userData: req.userData })
}

module.exports.getDartLesson = (req, res) => {
	var ch = req.params.chapiter;
	var les = req.params.lesson;

	if (les == "ex" && DartContent[ch].exercise) {
		res.render("layout/contentViewer", {
			data: DartContent, section: "dart", chapiter: DartContent[ch - 1].chapiter, lesson: "Exercises", ref: ch + "." + les,
			ch: ch,
			les: les,
			userData: req.userData
		});
	} else if ((les < 1) || (les > DartContent[ch - 1].lessons.length) || (les == "ex" && DartContent[ch - 1].exercise == false)) {
		res.send("Error 404");
	} else {
		res.render("layout/contentViewer", {
			data: DartContent,
			section: "dart",
			chapiter: DartContent[ch - 1].chapiter,
			lesson: DartContent[ch - 1].lessons[les - 1],
			ref: ch + "." + les,
			ch: ch,
			les: les,
			userData: req.userData
		});

	}

}

