exports.up = function (knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table.integer("movie_id").unsigned().notNullable();
    table
      .foreign("movie_id")
      .references("movie_id")
      .inTable("movies")
      .onDelete("CASCADE");
    table.integer("theater_id").unsigned().notNullable();
    table
      .foreign("theater_id")
      .references("theater_id")
      .inTable("theaters")
      .onDelete("CASCADE");
    table.boolean("is_showing");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("movies_theaters");
};

// - `movie_id`: (Foreign Key) A reference ID to a particular movie.
// - `theater_id`: (Foreign Key) A reference ID to a particular theater.
// - `is_showing`: (Boolean) A representation of whether or not the movie is currently showing in the referenced theater.
