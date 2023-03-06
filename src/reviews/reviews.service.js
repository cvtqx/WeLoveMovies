const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  //critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function read(review_id){
    return knex("reviews").select("*").where({review_id}).first();
}

//DELETE /reviews/:reviewId

function destroy(review_id){
        return knex("reviews").where({review_id}).del();
}

//PUT /reviews/:reviewId
function update(updatedReview){
    console.log(updatedReview);
    return knex("reviews")
    .select("*")
    .where({review_id: updatedReview.review_id})
    .update(updatedReview)
    .then((updatedReview) => updatedReview[0])
}

function getReviewWithCritic(review_id){
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .where({"r.review_id": review_id})
        .select("*")
        .first()
        .then(addCritic)

}

module.exports ={
    read,
    update,
    delete: destroy,
    getReviewWithCritic
}