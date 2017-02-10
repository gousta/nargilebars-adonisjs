'use strict'

const Bar = use('App/Model/Bar')

class BarController {
  * index (request, response) {
    const bars = yield Bar.all()
    response.json(bars)
  }
}

module.exports = BarController
