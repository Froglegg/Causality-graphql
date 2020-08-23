exports.up = function (knex) {
  return knex.schema.createTable("journals", (table) => {
    table.increments("id");
    table.integer("user").unsigned();
    table.foreign("user").references("users.id");
    table.string("journalName", 255);
    table.string("condition", 255);
    table.text("causality");
    table.text("notes");
    table.boolean("public");
    table.json("data");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  knex.schema.dropTableIfExists("journals");
};
