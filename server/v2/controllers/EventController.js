import sequelize from 'sequelize';
import models from '../models';
import { APPROVED_CENTER, ACTIVE_CENTER } from '../middleware/const';

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
/**
 * EventController
 *
 * @export
 * @class EventController
 */
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
        where: {
          $and: [
            { id: event.centerId },
            { approve: APPROVED_CENTER },
            { active: ACTIVE_CENTER }
          ]
        }
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
      event.active = 1;

      return models.events
        .create(event)
        .then(newEvent => res.status(201).json(newEvent));
    } catch (e) {
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
        return res.status(404).json({ event: 'Event does not exist.' });
      }

      return models.events
        .destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json(event));
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
      const {
        title, startDate, endDate, centerId
      } = req.body;

      const modifiedEvent = Object.assign({}, event.toJSON(), {
        title,
        startDate,
        endDate,
        centerId
      });

      const center = await models.centers.findOne({
        where: {
          $and: [
            { id: modifiedEvent.centerId },
            { approve: APPROVED_CENTER },
            { active: ACTIVE_CENTER }
          ]
        }
      });

      if (!center) {
        return res.status(422).json({ centerId: 'Invalid center' });
      }

      const bookedCenter = await models.events.findOne({
        where: {
          centerId: modifiedEvent.centerId,
          $or: bookedQueryParams(modifiedEvent.startDate, modifiedEvent.endDate)
        }
      });

      if (bookedCenter && bookedCenter.id !== event.id) {
        return res
          .status(422)
          .json({ global: ['Center has already been booked.'] });
      }

      return models.events
        .update(modifiedEvent, {
          where: { id: req.params.id }
        })
        .then(() => {
          res.status(201).json(modifiedEvent);
        });
    } catch (e) {
      return res.status(501).send('Internal server error.');
    }
  }
}
