
exports.up = function(knex) {
  return knex.schema.createTable("reviews", (table) =>{
    table.increments("review_id").primary();
    table.text("content");
    table.integer("score");
    table.integer("critic_id").unsigned().notNullable();
    table.foreign("critic_id").references("critic_id").inTable("critics").onDelete("CASCADE");
    table.integer("movie_id").unsigned().notNullable();
    table.foreign("movie_id").references("movie_id").inTable("movies").onDelete("CASCADE");
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("reviews");
  
};


// - `review_id`: (Primary Key) A unique ID for the review.
// - `content`: (Text) The content of the review, written in markdown.
// - `score`: (Integer) A numerical representation of the score given to the movie by the critic.
// - `critic_id`: (Foreign Key) A reference ID to a particular critic.
// - `movie_id`: (Foreign Key) A reference ID to a particular movie.