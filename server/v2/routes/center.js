import { center } from '../controllers';

import adminAuthentication from '../middleware/adminAuthentication';
import validateParamID from '../middleware/validateParamID';
import createCenterValidation from '../middleware/createCenterValidation';
import superAdminAuthentication from '../middleware/superAdminAuthentication';

module.exports = (app) => {
  app.post(
    '/centers',
    adminAuthentication,
    createCenterValidation,
    center.createCenter
  ); // Create Center
  app.get('/centers', center.getCenters); // Get all centers
  app.get('/centers/admin', adminAuthentication, center.getAdminCenters); // Get own centers
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
    '/centers/event/cancel/:id',
    validateParamID,
    adminAuthentication,
    center.cancelEvent
  ); // Cancel Event

  app.put(
    '/centers/toggle-active/:id',
    validateParamID,
    adminAuthentication,
    center.toggleCenterActiveness
  ); // Toggle Center Activeness

  app.put(
    '/centers/cancel/:id',
    validateParamID,
    superAdminAuthentication,
    center.declineCenter
  );

  app.put(
    '/centers/:id',
    validateParamID,
    adminAuthentication,
    createCenterValidation,
    center.editCenter
  ); // Update a center
};
