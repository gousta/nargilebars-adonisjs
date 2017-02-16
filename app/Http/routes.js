'use strict'

const Route = use('Route')

/**
 * General
 */
Route.get('/', 'PageController.welcome');
Route.get('/bars/:region/:area/:key', 'PageController.bar');
Route.get('/discover', 'PageController.discover');


/**
 * API v1
 */
Route.group('api_v1', function () {

  Route.get('/bar', 'Apiv1/BarController.index');

}).prefix('api/v1')

