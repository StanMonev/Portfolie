/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('resumes', function(table) {
    table.text('languages');
    table.json('settings');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('resumes', function(table) {
    table.dropColumn('languages');
    table.dropColumn('settings');
  });
};
