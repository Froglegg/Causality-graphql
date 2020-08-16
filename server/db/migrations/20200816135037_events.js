exports.up = function (knex) {
  return knex.schema.createTable("events", (table) => {
    table.increments("id");
    table.integer("journal");
    table.foreign("journal").references("journals.id");
    table.integer("user");
    table.foreign("user").references("users.id");
    table.string("event", 255);
    table.float("causality");
    table.integer("positives");
    table.integer("negatives");
    table.text("notes");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  knex.schema.dropTableIfExists("journals");
};
