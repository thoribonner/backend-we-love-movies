const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// * add critic details array to review

// const addCritic = mapProperties({
//   critic_id: 'critics.critic_id',
//   preferred_name: 'critics.preferred_name',
//   surname: 'critics.surname',
//   organization_name: 'critics.organization_name',
//   created_at: 'critics.created_at',
//   updated_at: 'critics.updated_at'
// })

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

// * get review by id
// * to be used for validation
function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

// * delete a review by id
function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

// * update review
function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
}

// * return updated review with critic details
function readReviewWithCritic(review_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.review_id": review_id })
    .first()
    .then(addCritic);
}

module.exports = {
  read,
  delete: destroy,
  update,
  readReviewWithCritic,
};
