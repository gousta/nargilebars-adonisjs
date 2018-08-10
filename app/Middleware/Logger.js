"use strict";

class Logger {
  async handle({ request }, next) {
    // call next to advance the request
    console.log("nargilebars->request", request.url());
    await next();
  }
}

module.exports = Logger;
