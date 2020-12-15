
exports.up = function (knex) {
    return knex.schema
        .createTable('department', tbl => {
            tbl.increments();
            tbl.string('name', 128).notNullable().unique();
        })
        .createTable('users', tbl => {
            tbl.increments();
            tbl.string('username', 128).notNullable().unique().index();
            tbl.string('password', 128).notNullable();
            tbl.integer('department')
                .unsigned()
                .references('department.id')
                .onDelete('CASCADE').onUpdate('CASCADE')
                .defaultTo(2);
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('department');
};
