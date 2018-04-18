import sequelize from 'sequelize';
import models from '../models';
import Event from './_support/Event';

/**
 * Build find event booked by date
 *
 * @param {string} startDate - Start date of event
 * @param {string} endDate - End date of event
 * @returns {array} - SQL condition
 */
const bookedQueryParams = (startDate, endDate) => [
  {
    $and: [
      {
        startDate: {
          [sequelize.Op.lte]: new Date(startDate)
        }
      },
      {
        endDate: { [sequelize.Op.gte]: new Date(startDate) }
      }
    ]
  },
  {
    $and: [
      {
        startDate: { [sequelize.Op.lte]: new Date(endDate) }
      },
      { endDate: { [sequelize.Op.gte]: new Date(endDate) } }
    ]
  }
];

module.exports = {
  /**
   * Create new event
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @return {*} - Server response
   */
  async createEvent(req, res) {
    try {
      const event = new Event(req.body);
      if (!event.safe()) {
        return res.status(422).json(event.getErrors());
      }

      const centerID = parseInt(req.body.centerid, 10) || 0;

      const center = await models.centers.findOne({ where: { id: centerID } });

      if (!center) {
        return res.status(422).json({ centerID: ['Invalid center'] });
      }

      const bookedEvent = await models.events.findOne({
        where: {
          centerid: center.id,
          $or: bookedQueryParams(event.startDate, event.endDate)
        }
      });

      if (bookedEvent) {
        return res
          .status(422)
          .json({ global: ['Center has already been booked.'] });
      }

      const validatedEvent = Object.assign(
        {},
        { userid: req.user.id, centerid: center.id },
        event.toJSON()
      );

      return models.events
        .create(validatedEvent)
        .then(newEvent => res.status(201).json(newEvent));
    } catch (e) {
      return res.status(501).send('Internal Server Error');
    }
  },
  /**
   * Delete a particular event
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @return {*} - Server response
   */
  async deleteEvent(req, res) {
    try {
      const event = await models.events.findOne({
        where: {
          $and: [{ id: req.params.id }, { userid: req.user.id }]
        }
      });

      if (!event) {
        return res
          .status(400)
          .json({ error: true, message: { event: 'Event does not exist.' } });
      }

      return models.events
        .destroy({ where: { id: req.params.id } })
        .then(deletedEvent => res.status(200).json(deletedEvent));
    } catch (error) {
      return res.status(501).send('Internal server error.');
    }
  },
  /**
   * Get all user's event
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @return {*} - Server response
   */
  getEvents(req, res) {
    return models.events
      .findAll({
        include: [
          {
            model: models.centers,
            as: 'center'
          }
        ],
        where: {
          userid: req.user.id
        }
      })
      .then(centers => res.status(200).json(centers))
      .catch(error => res.status(501).send(error));
  },

  /**
   * Edit event
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @return {*} - Server response
   */
  async editEvent(req, res) {
    try {
      const event = await models.events.findOne({
        where: {
          $and: [{ id: req.params.id }, { userid: req.user.id }]
        }
      });

      if (!event) {
        return res.status(422).send('Event does not exist');
      }

      req.body.centerid = req.body.centerid || event.centerid;

      const center = await models.centers.findOne({
        where: { id: req.body.centerid }
      });

      if (!center) {
        return res
          .status(422)
          .json({ error: true, message: { center: 'Invalid center' } });
      }

      const mEvent = new Event(event);
      mEvent.load(req.body);

      if (!mEvent.safe()) {
        return res.status(422).json(mEvent.getErrors());
      }

      const validatedEvent = Object.assign(mEvent.toJSON(), {
        centerid: center.id
      });

      return models.events
        .update(validatedEvent, {
          where: { id: req.params.id }
        })
        .then((updatedEvent) => {
          res.status(201).json(updatedEvent);
        });
    } catch (e) {
      res.status(501).send('Internal server error.');
    }
  }
};
