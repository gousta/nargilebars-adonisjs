'use strict'

const Bar = use('App/Model/Bar')
const Config = use('Config')

class PageController {
  * welcome (request, response) {
    const bars = yield Bar.all()
    console.log(bars)

    yield response.sendView('welcome', {
      page: 'welcome',
      bars: bars,
      googleMapsKey: Config.get('googlemaps.key')
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
      pageTitle: bar.get('title'),
      bar: bar,
      bars: yield Bar.all(),
      googleMapsKey: Config.get('googlemaps.key')
    })
  }

  * about (request, response) {
    yield response.sendView('about', {
      page: 'about',
      bars: yield Bar.all()
    })
  }
}

module.exports = PageController
