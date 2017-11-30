import sequelize from 'sequelize';
import moment from 'moment';
import models from '../models';
import Event from './_support/event';

const mEvent = models.events;

module.exports = {
  createEvent(req, res) {
    const event = new Event(req.body);
    
    if (!event.safe()) {
      return res.status(400).json(event.getErrors());
    }

    if (!req.body.centerid || parseInt(req.body.centerid) != req.body.centerid) {
      return res.status(400).send("Invalid center");
    }

  // check if center exist
  models.centers.findOne({
    where: { id: req.body.centerid }
  }).then((center) => {
    if (!center) {
      return res.status(400).send('Invalid center');
    }
  // check if there is center for event at start date
  models.events.findOne({
    where: {
      centerid: center.id,
      startdate: {
        [sequelize.Op.gte]: new Date(event.startdate),
        [sequelize.Op.lte]: new Date(event.enddate)
      }
    }
  }).then((existingEvent) => {
    if (existingEvent) {
      return res.status(400).send('Center is not available');
    }

  // user must exist
  models.users.findOne({
    where: { id: 2 } // USE TOKEN
  })
  .then((existingUsers) => {
    if (!existingUsers) {
      return res.status(400).send('Invalid user');
    }

  // create event 
  const validatedEvent = Object.assign({userid: existingUsers.id, centerid: center.id }, event.toJSON());

  models.events.create(validatedEvent)
  .then((newEvent) => {
    if (!newEvent) {
      return res.status(400).send('Can not create event');
    }
    return res.status(200).json(newEvent);
  });

  })
  });
  })
},

deleteEvent(req, res) {
  return mEvent.delete(req.params.id)
  .then((event) => {
   return res.status(200).json(event);
 })
  .catch((error) => res.status(400).send(error));
},

editEvent(req, res) {

  if (!req.params.id || parseInt(req.params.id) != req.params.id || req.params.id > 100000) {
    return res.status(400).send("Invalid event");
  }

  return models.events.findOne({ where: { id: req.params.id } })
  .then((event) => {
    if (!event) {
      return res.status(400).send('Event does not exist');
    }

    req.body.centerid = req.body.centerid ? req.body.centerid : event.centerid;

    if (parseInt(req.body.centerid) != req.body.centerid || req.body.centerid > 100000) {
        return res.status(400).send("Invalid center");
    }
    models.centers.findOne({ where: { id: req.body.centerid } })
    .then((center) => {
      if (!center) {
        return res.status(400).send('Invalid center id');
      }

      const mEvent = new Event(event);
      //console.log(event); 
      mEvent.load(req.body);

      
      

      if (!mEvent.safe()) {
        return res.status(400).json(mEvent.getErrors());
      }

      const validatedEvent = Object.assign(mEvent.toJSON(), { centerid: center.id });
      models.events.update(validatedEvent, {
        where: { id: req.params.id }
      })
      .then((event) => {
        res.status(200).json(event);
      });
    });
  });
},
};
