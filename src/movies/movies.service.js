const knex = require("../db/connection");

// * return all movies
function list() {
  return knex("movies").select("*");
}

// * return is_showing movies
function listNowPlaying() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct("m.*")
    .where({ "mt.is_showing": true });
}

module.exports = {
  list,
  listNowPlaying
};
