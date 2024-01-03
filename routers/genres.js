const express = require( "express" );
const router = express();
let node_uid = require( "node-uid" );
const Joi = require("joi");
const movies = [
  { id: "1", genre: "Horror" },
  { id: "2", genre: "Drama" },
  { id: "3", genre: "Comedy" },
  { id: "4", genre: "Action" },
  { id: "5", genre: "Fantasy" },
];

const validateGenres = (movie) => {
  const schema = Joi.object().keys({
    genre: Joi.string().min(3).required(),
  });
  return schema.validate(movie);
};


router.get("/", (req, res) => {
  res.send(movies);
});

router.get("/:id", (req, res) => {
  const movie = movies.find((m) => m.id === req.params.id);

  if (!movie)
    res
      .status(404)
      .send(`The movie with the given ID: ${req.params.id} was not found.`);
  res.send(movie.genre);
});

router.post("/", (req, res) => {
  const { error } = validateGenres(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const movie = {
    id: node_uid(),
    genre: req.body.genre,
  };
  movies.push(movie);
  res.status(200).send(movies);
});

router.put("/api/genres/:id", (req, res) => {
  const movie = movies.find((m) => m.id === req.params.id);
  if (!movie)
    res
      .status(404)
      .send(`The movie with the given ID: ${req.params.id} was not found.`);
  res.send(movie.name);

  const { error } = validateGenres(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  movie.genre = req.body.genre;
  res.status(200).send(movie);
});

router.delete("/:id", (req, res) => {
  const movie = movies.find((m) => m.id === req.params.id);
  if (!movie)
    return res
      .status(404)
      .send(`The movie with the given ID: ${req.params.id} was not found.`);
  const index = movies.indexOf(movie);
  movies.splice(index, 1);
  res.send(movies);
});

module.exports = router;