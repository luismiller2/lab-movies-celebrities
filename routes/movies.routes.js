const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const { findById } = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
// router.get("/", (req, res, next) => {
//     console.log("This is in the movies route");
//     Movie.find()
//     .then((allMovies) => {
//         res.render('movies/movies', {allMovies: allMovies});
//     })
//     .catch((error) => {
//         console.log("Failure", error.message);
//     });
//   });
  
router.get("/create", (req, res, next) => {
    Celebrity.find()
    .then((allCelebrities) => {
        res.render('movies/new-movie', {allCelebrities: allCelebrities});
    })
    .catch((error) => {
        console.log("Failure", error.message);
    });
  });

router.get("/", (req, res, next) => {
    Movie.find()
    .then((allMovies) => {
        res.render('movies/movies', {allMovies: allMovies});
    })
    .catch((error) => {
        console.log("Failure", error.message);
    });
  });
    
router.post("/create", (req, res, next) => {
    console.log("About to create movie", req.body);
    // res.render("index");

    Movie.create({
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    })
    .then(()=> {
    res.redirect("/movies");
  })
  .catch((error) => {
      console.log("Failed", error.message)
      res.render("movies/new-movie");
  });
});

router.get("/:id", (req, res) => {
    Movie.findById(req.params.id)
      .populate("cast")
      .then((movie) => {
        res.render("movies/movie-details", { movie: movie });
      })
      .catch((error) => {
        res.redirect("/movies");
      });
  });

  router.post("/:id/delete", (req, res) => {
    Movie.findByIdAndRemove(req.params.id)
      .then(() => {
        res.redirect("/movies");
      })
      .catch((error) => {
        res.redirect("/movies");
      });
  });

  router.get("/:id/edit", (req, res) => {
    Movie.findById(req.params.id)
      .then((foundMovie) => {
        Celebrity.find().then((allCelebs) => {
          res.render("movies/edit-movie", {
            movie: foundMovie,
            celebrities: allCelebs,
          });
        });
      })
      .catch((error) => {
        res.redirect("/movies");
      });
  });

    router.post("/:id/edit", (req, res, next) => {
        Movie.findByIdAndUpdate(req.params.id, {
          title: req.body.title,
          genre: req.body.genre,
          plot: req.body.plot,
          cast: req.body.cast,
        })
        .then(() => {
            res.redirect("/movies");
          })
          .catch((error) => {
            res.redirect("/movies");
          });
      });
  


module.exports = router;