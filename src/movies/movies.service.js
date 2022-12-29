const knex = require('../db/connection');
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",

})


//get/movies endpoint

function list(){
    return knex("movies").select("*")

}

//GET /movies?is_showing=true

function listShowingMovies(){
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({"mt.is_showing": true})
    .groupBy("m.movie_id");

}

//GET /movies/:movieId endpoint

function read(movie_id){
    return knex("movies")
    .select("*")
    .where({"movie_id": movie_id})
    .first()
}

//GET /movies/:movieId/theaters endpoint

function listTheatersPlayingMovie(movie_id){
    return knex("movies_theaters as mt")
      .join("theaters as t", "t.theater_id", "mt.theater_id")
      .select("*")
      .where({ "movie_id": movie_id, "is_showing": true });       
}

//GET /movies/:movieId/reviews endpoint

function reviewsForMovie(movie_id){
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("*")
        .where({"r.movie_id": movie_id})
        .then(data => data.map(addCritic))        
}


module.exports ={
    list,
    listShowingMovies,
    read,
    listTheatersPlayingMovie,
    reviewsForMovie
}