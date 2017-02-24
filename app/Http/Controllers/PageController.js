'use strict'

const Bar = use('App/Model/Bar')
const Config = use('Config')

class PageController {
  * welcome (request, response) {
    yield response.sendView('welcome', {
      page: 'welcome',
      bars: yield Bar.all(),
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
      pageTitle: `${bar.get('title')} @ ${bar.get('address.area')}`,
      pageDescription: `Κατάστημα ${bar.get('title')}, ${bar.address()} - Ναργιλεδάδικα, Cafes, Bars, Lounges`,
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

  * contact (request, response) {
    yield response.sendView('contact', {
      page: 'contact',
      bars: yield Bar.all()
    })
  }

  * contactDo (request, response) {
    console.log(request.all());
    yield response.sendView('contact', {
      page: 'contact',
      bars: yield Bar.all(),
      message: 'Το μήνυμα σας στάλθηκε. Θα προσπαθήσουμε να απαντήσουμε εντός μιας εβδομάδας.'
    })
  }
}

module.exports = PageController
