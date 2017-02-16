'use strict'

const Bar = use('App/Model/Bar')

class BarController {
  * index (request, response) {
    response.json({
      status: 'ok',
      data: yield Bar.all()
    })
  }
}

module.exports = BarController
