'use strict'

const Route = use('Route')

/**
 * General
 */
Route.get('/', 'PageController.welcome');
Route.get('/discover/:region/:area/:key', 'PageController.bar');
Route.get('/about', 'PageController.about');


/**
 * API v1
 */
Route.group('api_v1', function () {

  Route.get('/bar', 'Apiv1/BarController.index');

}).prefix('api/v1')

