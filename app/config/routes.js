/**
 * Alias Route Mappings
 *
 * Your routes map URLs to views and controllers.
 */

module.exports = {

  'GET /': 'WebsiteController.get',
  'GET /api/personas': 'WebsiteController.listPersonas',
  'POST /api/personas': 'WebsiteController.savePersona',

};
