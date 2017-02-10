'use strict'

const Route = use('Route')

/**
 * General
 */
Route.on('/').render('welcome')


/**
 * API v1
 */
Route.get('/api/v1/bar', 'Apiv1/BarController.index');
