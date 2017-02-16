'use strict'

const Bar = use('App/Model/Bar')

class PageController {
  * welcome (request, response) {
    const bars = yield Bar.all()
    console.log(bars)

    yield response.sendView('welcome', {
      page: 'welcome',
      bars: bars
    })
  }

  * bar (request, response) {
    const slug = request.param('region')+'/'+request.param('area')+'/'+request.param('key')
    const bar = yield Bar.where('slug', slug).findOne()

    if(!bar) {
      yield response.status(404).sendView('errors.404')
      return
    }

    yield response.sendView('bar', {
      page: 'bar',
      bar: bar,
      bars: yield Bar.all()
    })
  }

  * discover (request, response) {
    yield response.sendView('discover', {
      page: 'discover',
      bars: yield Bar.all()
    })
  }
}

module.exports = PageController
