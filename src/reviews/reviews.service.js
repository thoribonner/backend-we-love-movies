const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// add critic details array to review
const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

// get review by id
// to be used for validation
function read(review_id) {
  // >> select *
  // >> from reviews
  // >> where review_id = { review_id };

  return knex("reviews").select("*").where({ review_id }).first();
  // .first() returns first row in table as an object
}

// delete a review by id
function destroy(review_id) {
  // >> select *
  // >> from reviews
  // >> where review_id = { review_id };

  return knex("reviews").where({ review_id }).del();
}

// update review
function update(updatedReview) {
  // >> delete from reviews
  // >> where review_id = { updatedReview.review_id };

  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
}

// return updated review with critic details
function readReviewWithCritic(review_id) {
  // >> select *
  // >> from reviews as r
  // >> join critics as c
  // >> on r.critic_id = c.critic_id
  // >> where r.movie_id = { movie_id };

  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.review_id": review_id })
    .first()
    .then(addCritic);

  // .then(addCritic) transform critc info to a critic object within review object
}

module.exports = {
  read,
  delete: destroy,
  update,
  readReviewWithCritic,
};
