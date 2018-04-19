import { center } from '../controllers';

import adminAuthentication from '../middleware/adminAuthentication';
import validateParamID from '../middleware/validateParamID';

module.exports = app => {
  app.post('/centers', adminAuthentication, center.createCenter); // Create Center
  app.get('/centers', center.getCenters); // Get all centers
  app.get('/centers/admin', adminAuthentication, center.getAdminCenters); // Get own centers
  app.get('/centers/events', adminAuthentication, center.getOwnEvents); // Get own events
  app.get('/centers/contacts', adminAuthentication, center.getContacts); // Get Own Center Contacts
  app.get('/centers/search', center.search);

  app.get('/centers/:id', validateParamID, center.getCenter); // Get a Single Center, does not need authentication

  app.put(
    '/centers/:id',
    validateParamID,
    adminAuthentication,
    center.editCenter
  ); // Update a center
};
