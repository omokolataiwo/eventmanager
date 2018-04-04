import sequelize from 'sequelize';
import models from '../models';
import Event from './_support/event';

module.exports = {
  createEvent(req, res) {
    const event = new Event(req.body);
    if (!event.safe()) {
      return res.status(400).json(event.getErrors());
    }

    console.log(event.toJSON());

    // check if center exist
    return models.centers
      .findOne({ where: { id: req.body.centerid } })
      .then((center) => {
        if (!center) {
          return res.status(400).json({ error: true, message: { center: 'Invalid center' } });
        }
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
            const validatedEvent = Object.assign(
              {},
              { userid: req.user.id, centerid: center.id },
              event.toJSON(),
            );

            return models.events
              .create(validatedEvent)
              .then(newEvent => res.status(200).json(newEvent))
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
