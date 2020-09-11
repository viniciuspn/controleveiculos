const knex = require('knex');

module.exports = {

    veiculo: function (database) {
        return knex({
            client: 'sqlite3',
            connection: {
                filename: "./sql/veiculo.db"
            },
            useNullAsDefault: true

        });
    }
};
