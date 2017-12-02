import sequelize from 'sequelize';
import models from '../models';
import Event from './_support/event';

module.exports = {
  createEvent(req, res) {
    const event = new Event(req.body);
    if (!event.safe()) {
      return res.status(400).json(event.getErrors());
    }

    // check if center exist
    models.centers.findOne({ where: { id: req.body.centerid } }).then((center) => {
      if (!center) {
        return res.status(400).json({ error: true, message: { center: 'Invalid center' } });
      }

      // check if there is center for event at start date
      return models.events
        .findOne({
          where: {
            centerid: center.id,
            $or: [
              {
                $and: [
                  { startdate: { [sequelize.Op.lte]: new Date(event.startdate) } },
                  { enddate: { [sequelize.Op.gte]: new Date(event.startdate) } },
                ],
              },
              {
                $and: [
                  { startdate: { [sequelize.Op.lte]: new Date(event.enddate) } },
                  { enddate: { [sequelize.Op.gte]: new Date(event.enddate) } },
                ],
              },
            ],
          },
        })
        .then((existingEvent) => {
          if (existingEvent) {
            return res
              .status(400)
              .json({ error: true, message: { event: 'Center is not available' } });
          }
          // user must exist
          return models.users
            .findOne({
              where: { id: req.user.id },
            })
            .then((existingUsers) => {
              if (!existingUsers) {
                return res.status(400).send('Invalid user');
              }

              // create event
              const validatedEvent = Object.assign(
                { userid: existingUsers.id, centerid: center.id },
                event.toJSON(),
              );

              return models.events.create(validatedEvent).then((newEvent) => {
                if (!newEvent) {
                  return res.status(400).send('Can not create event');
                }
                return res.status(200).json(newEvent);
              });
            });
        });
    });
  },

  deleteEvent(req, res) {
    return models.events
      .findOne({
        where: {
          $and: [{ id: req.params.id }, { userid: req.user.id }],
        },
      })
      .then((event) => {
        if (!event) {
          return res.status(400).json({ error: true, message: { event: 'Event does not exist.' } });
        }

        return models.events
          .destroy({
            where: { id: req.params.id },
          })
          .then(event => res.status(200).json(event))
          .catch(error => res.status(500).json(error));
      })
      .catch(error => res.status(500).json(error));
  },
  getEvents(req, res) {
    return models.events
      .findAll({
        where: {
          userid: req.user.id,
        },
      })
      .then(centers => res.status(200).json(centers))
      .catch(error => res.status(400).send(error));
  },

  editEvent(req, res) {
    return models.events
      .findOne({
        where: {
          $and: [{ id: req.params.id }, { userid: req.user.id }],
        },
      })
      .then((event) => {
        if (!event) {
          return res.status(400).send('Event does not exist');
        }
        req.body.centerid = req.body.centerid ? req.body.centerid : event.centerid;

        if (parseInt(req.body.centerid) != req.body.centerid || req.body.centerid > 100000) {
          return res.status(400).json({ error: true, message: { center: 'Invalid center' } });
        }
        models.centers.findOne({ where: { id: req.body.centerid } }).then((center) => {
          if (!center) {
            return res.status(400).json({ error: true, message: { center: 'Invalid center' } });
          }
          const mEvent = new Event(event);
          mEvent.load(req.body);

          if (!mEvent.safe()) {
            return res.status(400).json(mEvent.getErrors());
          }
          const validatedEvent = Object.assign(mEvent.toJSON(), {
            centerid: center.id,
          });

          return models.events
            .update(validatedEvent, {
              where: { id: req.params.id },
            })
            .then((event) => {
              res.status(200).json(event);
            });
        });
      });
  },
};
