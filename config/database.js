"use strict";

const Env = use("Env");
const Helpers = use("Helpers");

module.exports = {
  connection: Env.get("DB_CONNECTION", "mongodb"),

  mongodb: {
    connectionString: Env.get("DB_CONNECTION_STRING", null),
    connection: {
      host: Env.get("DB_HOST", "127.0.0.1"),
      port: Env.get("DB_PORT", 27017),
      user: Env.get("DB_USER", ""),
      pass: Env.get("DB_PASSWORD", ""),
      database: Env.get("DB_DATABASE", "nargilebars"),
      options: {
        useNewUrlParser: true,
        // All options can be found at http://mongoosejs.com/docs/connections.html
      },
      debug: false
    }
  }
};
