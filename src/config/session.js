import Sequelize from "sequelize";
import session from "express-session";

const configSession = (app) => {
    // initalize sequelize with session store
    var SequelizeStore = require("connect-session-sequelize")(session.Store);

    // create database, ensure 'sqlite3' in your package.json
    var sequelize = new Sequelize("database", "username", "password", {
        dialect: "sqlite",
    });

    // configure express
    var app = express();
    app.use(
        session({
            secret: "keyboard cat",
            store: new SequelizeStore({
                db: sequelize,
            }),
            resave: false, // we support the touch method so per the express-session docs this should be set to false
            proxy: true, // if you do SSL outside of node.
        })
    );
}

export default configSession;