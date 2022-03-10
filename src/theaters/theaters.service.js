const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

// add movie objects to movies array per theater
const addMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  rating: ["movies", null, "rating"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  is_showing: ["movies", null, "is_showing"],
  created_at: ['movies', null, 'created_at'],
  updated_at: ['movies', null, 'updated_at'],
});

// return all theaters with movies showing info
function list() {
  // >> select *
  // >> from theaters as t
  // >> join movies_theaters as mt
  // >> on t.theater_id = mt.theater_id
  // >> join movies as m
  // >> on mt.movie_id = m.movie_id;

  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("*")
    .then(addMovies);

  // .then(addMovies) transform movie info to objects in movies array
}

module.exports = {
  list,
};
