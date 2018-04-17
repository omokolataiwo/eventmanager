import sequelize from 'sequelize';
import models from '../models';
import Event from './_support/Event';

module.exports = {
  createEvent(req, res) {
    const event = new Event(req.body);
    if (!event.safe()) {
      return res.status(422).json(event.getErrors());
    }

    const centerID = parseInt(req.body.centerid, 10) || 0;

    // check if center exist
    return models.centers
      .findOne({ where: { id: centerID } })
      .then((center) => {
        if (!center) {
          return res.status(422).json({ centerid: ['Invalid center'] });
        }
        return models.events
          .findOne({
            where: {
              centerid: center.id,
              $or: [
                {
                  $and: [
                    { startDate: { [sequelize.Op.lte]: new Date(event.startDate) } },
                    { endDate: { [sequelize.Op.gte]: new Date(event.startDate) } },
                  ],
                },
                {
                  $and: [
                    { startDate: { [sequelize.Op.lte]: new Date(event.endDate) } },
                    { endDate: { [sequelize.Op.gte]: new Date(event.endDate) } },
                  ],
                },
              ],
            },
          })
          .then((existingEvent) => {
            if (existingEvent) {
              return res.status(422).json({ global: ['Center has already been booked.'] });
            }
            const validatedEvent = Object.assign(
              {},
              { userid: req.user.id, centerid: center.id },
              event.toJSON(),
            );

            return models.events
              .create(validatedEvent)
              .then(newEvent => res.status(201).json(newEvent))
              .catch((e) => {
                res.status(501).send(e);
              });
          })
          .catch(e => res.status(501).send(e));
      })
      .catch(e => res.status(501).send(e));
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
        include: [
          {
            model: models.centers,
            as: 'center',
          },
        ],
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

        return models.centers.findOne({ where: { id: req.body.centerid } }).then((center) => {
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
              res.status(201).json(event);
            });
        });
      });
  },
};
