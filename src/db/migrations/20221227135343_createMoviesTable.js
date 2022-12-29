
exports.up = function(knex) {
  return knex.schema.createTable("movies", (table) =>{
        table.increments("movie_id").primary();
        table.string("title");
        table.integer("runtime_in_minutes");
        table.string("rating");
        table.text("description");
        table.string("image_url");
        table.timestamps(true, true);
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("movies");
  
};


// - `movie_id`: (Primary Key) A unique ID for the movie.
// - `title`: (String) The title of the movie.
// - `runtime_in_minutes`: (Integer) The length of the movie in minutes.
// - `rating`: (String) The rating given to the movie.
// - `description`: (Text) A shortened description of the movie.
// - `image_url`: (String) A URL to the movie's poster.
