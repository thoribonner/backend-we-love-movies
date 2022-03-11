const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// add critic details array to review
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

// return all movies
function list() {
  // >> select * from movies

  return knex("movies").select("*");
}

// return all is_showing movies
function listIsShowing() {
  // >> select m.*
  // >> from movies as m
  // >> join movies_theaters as mt
  // >> on m.movie_id = mt.movie_id;

  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct("m.*")
    .where({ "mt.is_showing": true });
}

// return movie by id
function read(movie_id) {
  // >> select *
  // >> from movies
  // >> where movie_id = { movie_id };

  return knex("movies").select("*").where({ movie_id }).first();

  // .first() returns first row in table as an object
}

// return theaters movie by id showing at
function readIsShowingTheaters(movie_id) {
  // >> select t.*
  // >> from theaters as t
  // >> join movies_theaters as mt
  // >> on t.theater_id = mt.theater_id
  // >> where mt.movie_id = { movie_id };

  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({ "mt.movie_id": movie_id })
    .andWhere({ "mt.is_showing": true});
}

// return movie by id with reviews
function readMovieReviews(movie_id) {
  // >> select *
  // >> from reviews as r
  // >> join critics as c
  // >> on r.critic_id = c.critic_id
  // >> where r.movie_id = { movie_id };

  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.movie_id": movie_id })
    .then((reponse) => reponse.map(addCritic));

  // .then(addCritic) transform critc info to a critic object within review object
}

module.exports = {
  list,
  listIsShowing,
  read,
  readIsShowingTheaters,
  readMovieReviews,
};
