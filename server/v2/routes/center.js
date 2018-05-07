import { center } from '../controllers';

import adminAuthentication from '../middleware/adminAuthentication';
import validateParamID from '../middleware/validateParamID';
import createCenterValidation from '../middleware/createCenterValidation';
import updateCenterValidation from '../middleware/updateCenterValidation';
import superAdminAuthentication from '../middleware/superAdminAuthentication';
import validateQuery from '../middleware/validateQuery';

module.exports = (app) => {
  app.post(
    '/centers',
    adminAuthentication,
    createCenterValidation,
    center.createCenter
  ); // Create Center

  app.get(
    '/centers',
    validateQuery, center.getCenters
  ); // Get all centers

  app.get(
    '/centers/admin',
    adminAuthentication, center.getAdminCenters
  ); // Get own centers

  app.get(
    '/centers/protected',
    superAdminAuthentication, center.getAllProtectedCenters
  );
  app.get('/centers/events', adminAuthentication, center.getOwnEvents); // Get own events
  app.get('/centers/contacts', adminAuthentication, center.getContacts); // Get Own Center Contacts
  app.get('/centers/search', center.search);

  app.get('/centers/:id', validateParamID, center.getCenter); // Get a Single Center, does not need authentication

  app.put(
    '/centers/approve/:id',
    validateParamID,
    superAdminAuthentication,
    center.approveCenter
  );

  app.put(
    '/centers/:id',
    validateParamID,
    adminAuthentication,
    updateCenterValidation,
    center.editCenter
  ); // Update a center
};
