var express = require("express");
var router = express.Router();
var User = require("../modules/user");
var passport = require("passport");
const Reflection = require("../modules/reflection");
const reflection = require("../modules/reflection");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Home" });
});

router.get("/about-this-app", (req, res, next) => {
  res.render("about-this-app", { title: "About This App" });
});

router.get("/reflections", (req, res, next) => {
  Reflection.find()
    .exec()
    .then((reflections) => {
      res.render("reflections", { title: "Reflections", dataset: reflections });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving reflections");
    });
});

router.get("/login", (req, res, next) => {
  let sessionMsgs = req.session.messages || [];
  req.session.messages = [];
  res.render("login", { title: "Login", messages:sessionMsgs });
});

router.post("/login", passport.authenticate(
  "local",
  {
    successRedirect:"/reflections",
    failureRedirect:"/login",
    failureMessage:"Invalid Credential"
  }
));

router.get("/register", (req, res, next) => {
  res.render("register", { title: "Register" });
});


router.get("/create", (req, res, next) => {
  res.render("create", { title: "Add New Reflection" });
});

router.post("/create", (req, res, next) => {
  Reflection.create({
    title: req.body.title,
    works: req.body.works,
    type: req.body.type,
    content: req.body.content,
  })
    .then((newReflection) => {
      res.redirect("/reflections");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error creating the reflection");
    });
});

router.get("/delete/:_id", (req, res, next) => {
  Reflection.deleteOne({ _id: req.params._id })
    .then(() => {
      res.redirect("/reflections");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting the reflection");
    });
});

router.get('/read/:_id', (req, res, next) => {
  Reflection.findById(req.params._id)
    .then(reflection => {
      res.render('read', { reflection: reflection });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Error retrieving the reflection');
    });
});

router.get('/edit/:_id', (req, res, next) => {
  Reflection.findById(req.params._id)
    .then(reflection => {
      res.render('edit', { reflection: reflection });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Error retrieving the reflection for edit');
    });
});

router.post('/update/:_id', (req, res, next) => {
  Reflection.findByIdAndUpdate(req.params._id, {
    title: req.body.title,
    works: req.body.works,
    type: req.body.type,
    content: req.body.content
  })
    .then(() => {
      res.redirect('/reflections');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Error updating the reflection');
    });
});

router.post("/register", (req, res, next) => {
  new User({username:req.body.username}),
  req.body.password,
  (err, newUser) => {
    if (err) {
      console.log(err);
      return res.redirect("/register");
    }
    else {
      req.login(newUser, (err) => {res.redirect("/reflections");})
    }
  }
});

module.exports = router;
