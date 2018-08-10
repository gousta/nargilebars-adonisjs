"use strict";

class Logger {
  async handle({ request }, next) {
    // call next to advance the request
    console.log("NARGILEBARS\\HTTP", request.url());
    await next();
  }
}

module.exports = Logger;
