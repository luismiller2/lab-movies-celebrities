const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/", (req, res, next) => {
    console.log("This is in the celebrities route");
    Celebrity.find()
    .then((allCelebrities) => {
        res.render('celebrities/celebrities', {allCelebrities: allCelebrities});
    })
    .catch((error) => {
        console.log("Failure", error.message);
    });
  });
  
router.get("/create", (req, res, next) => {
    console.log("This is in the celebrities route");
    res.render("celebrities/new-celebrity");
  });
router.post("/create", (req, res, next) => {
    console.log("About to create celeb", req.body);
    // res.render("index");

    Celebrity.create({
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    })
    .then((createdCeleb)=> {
    console.log("Success", createdCeleb);
    res.redirect("/celebrities");
  })
  .catch((error) => {
      console.log("Failed", error.message)
      res.render("celebrities/new-celebrity");
  });
});


module.exports = router;