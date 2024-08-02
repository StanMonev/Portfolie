/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('functional_cookies', table => {
      table.increments('id').primary();
      table.string('session_id').notNullable();
      table.string('cookie_name').notNullable();
      table.string('cookie_value').notNullable();
      table.timestamps(true, true);
    })
    .createTable('analytics', table => {
      table.increments('id').primary();
      table.string('url').notNullable();
      table.string('referrer');
      table.string('user_agent').notNullable();
      table.string('ip').notNullable();
      table.string('country');
      table.string('session_id').notNullable();
      table.timestamp('timestamp').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('analytics')
    .dropTableIfExists('functional_cookies');
};
