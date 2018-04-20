import sequelize from 'sequelize';
import models from '../models';

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

export default class EventController {
  /**
   * Create new event
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @return {*} - Server response
   */
  static async createEvent(req, res) {
    try {
      const event = req.body;

      const center = await models.centers.findOne({
        where: { id: event.centerId }
      });

      if (!center) {
        return res.status(422).json({ centerId: ['Invalid center'] });
      }

      const bookedEvent = await models.events.findOne({
        where: {
          centerId: center.id,
          $or: bookedQueryParams(event.startDate, event.endDate)
        }
      });

      if (bookedEvent) {
        return res
          .status(422)
          .json({ global: ['Center has already been booked.'] });
      }

      event.userId = req.user.id;

      return models.events
        .create(event)
        .then(newEvent => res.status(201).json(newEvent));
    } catch (e) {
      console.log(e);
      return res.status(501).send('Internal Server Error');
    }
  }
  /**
   * Delete a particular event
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @return {*} - Server response
   */
  static async deleteEvent(req, res) {
    try {
      const event = await models.events.findOne({
        where: {
          $and: [{ id: req.params.id }, { userId: req.user.id }]
        }
      });

      if (!event) {
        return res.status(400).json({ event: 'Event does not exist.' });
      }

      return models.events
        .destroy({ where: { id: req.params.id } })
        .then(deletedEvent => res.status(200).json(event));
    } catch (error) {
      return res.status(501).send('Internal server error.');
    }
  }
  /**
   * Get all user's event
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @return {*} - Server response
   */
  static getEvents(req, res) {
    return models.events
      .findAll({
        include: [
          {
            model: models.centers,
            as: 'center'
          }
        ],
        where: {
          userId: req.user.id
        }
      })
      .then(centers => res.status(200).json(centers))
      .catch(error => res.status(501).send(error));
  }
  /**
   * Edit event
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @return {*} - Server response
   */
  static async editEvent(req, res) {
    try {
      const event = await models.events.findOne({
        where: {
          $and: [{ id: req.params.id }, { userId: req.user.id }]
        }
      });

      if (!event) {
        return res.status(422).send('Event does not exist');
      }

      req.body.centerId = req.body.centerId || event.centerId;

      const center = await models.centers.findOne({
        where: { id: req.body.centerId }
      });

      if (!center) {
        return res
          .status(422)
          .json({ error: true, message: { center: 'Invalid center' } });
      }

      req.body.userId = event.userId;

      return models.events
        .update(req.body, {
          where: { id: req.params.id }
        })
        .then(updatedEvent => {
          res.status(201).json(req.body);
        });
    } catch (e) {
      return res.json(e);
      res.status(501).send('Internal server error.');
    }
  }
}
