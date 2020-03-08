import Sequelize from 'sequelize';

const Database = new Sequelize('la_releve_evolved', 'baptiste', null, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  dialectOptions: {
    socketPath: '/var/run/mysqld/mysqld.sock',
  },
  define: {
    paranoid: true,
  },
  logging: false
});

export default Database;
