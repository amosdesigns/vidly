//const dotenv = require( "dotenv" );
const serverSettings = {};
require("dotenv").config({ processEnv: serverSettings });
const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());
let node_uid = require("node-uid");

const movies = [
  { id: "1", genre: "Horror" },
  { id: "2", genre: "Drama" },
  { id: "3", genre: "Comedy" },
  { id: "4", genre: "Action" },
  { id: "5", genre: "Fantasy" },
];

const validateCourse = (movie) => {
  const schema = Joi.object().keys({
    genre: Joi.string().min(3).required(),
  });
  return schema.validate(movie);
};

app.get("/", (req, res) => {
  res.send("Welcome to Vidly.com");
});

app.get("/api/genres", (req, res) => {
  res.send(movies);
});

app.get("/api/genres/:id", (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));

  if (!movie)
    res
      .status(404)
      .send(`The movie with the given ID: ${req.params.id} was not found.`);
  res.send(movie.genre);
});

app.post("/api/genres", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const movie = {
    id: node_uid(),
    genre: req.body.genre,
  };
  movies.push(movie);
  res.status(200).send(movies);
});

app.put("/api/genres/:id", (req, res) => {
  const movie = movies.find((m) => m.id === req.params.id);
  if (!movie)
    res
      .status(404)
      .send(`The movie with the given ID: ${req.params.id} was not found.`);
  res.send(movie.name);

  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  movie.genre = req.body.genre;
  res.status(200).send(movie);
});

app.delete("/api/genres/:id", (req, res) => {
  const movie = movies.find((m) => m.id === req.params.id);
  if (!movie)
    return res
      .status(404)
      .send(`The movie with the given ID: ${req.params.id} was not found.`);
  const index = movies.indexOf(movie);
  movies.splice( index, 1 );
  res.send(movies);
});

let PORT = parseInt(serverSettings.DEV_PORT);
if (serverSettings.STATUS === "production") {
  PORT = parseInt(serverSettings.PROD_PORT);
}
// app configurations
app.set("PORT", PORT);

app.listen(PORT, () => console.log(`Vidly.com Server running on Port ${PORT}`));
