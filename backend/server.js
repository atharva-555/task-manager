import sequalize from sequelize;
import config from '.src/config/db.js';

const db = new Sequelize(config[process.env.NODE_ENV]);