import sequelize from 'sequelize';
import { validate } from 'validate.js';
import moment from 'moment';
import models from '../models';
import { APPROVED_CENTER, ACTIVE_CENTER } from '../middleware/const';
import { validationRules } from '../middleware/validateCreateEvent';

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
        return res.status(422).json({
          status: 'error',
          errors: { centerId: ['Invalid center'] }
        });
      }

      const bookedEvent = await models.events.findOne({
        where: {
          centerId: center.id,
          $or: bookedQueryParams(event.startDate, event.endDate)
        }
      });

      if (bookedEvent) {
        return res.status(409).json({
          status: 'error',
          errors: {
            title: ['Center has already been booked.']
          }
        });
      }

      event.userId = req.user.id;
      event.active = 1;

      return models.events
        .create(event)
        .then(newEvent => res.status(201).json({ event: newEvent }));
    } catch (e) {
      return res.status(500).send({
        status: 'error',
        message: 'Internal Server Error'
      });
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
        return res.status(404).json({
          status: 'error',
          errors: { event: ['Event does not exist.'] }
        });
      }

      return models.events
        .destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ event }));
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        message: 'Internal Server Error'
      });
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
    const LIMIT = 6;
    const page = req.query.page - 1 || 0;
    return models.events
      .findAndCountAll({
        include: [
          {
            model: models.centers,
            as: 'center'
          }
        ],
        where: {
          userId: req.user.id
        },
        limit: LIMIT,
        offset: LIMIT * page,
        order: [['id', 'DESC']]
      })
      .then((events) => {
        if (!events) {
          return res.status(404).json({
            status: 'error',
            errors: { event: ['Event not found.'] }
          });
        }
        return res.status(200).json({
          events: events.rows,
          count: events.count
        });
      })
      .catch(() =>
        res.status(500).send({
          status: 'error',
          message: 'Internal Server Error'
        }));
  }

  /**
   * Get all user's event
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @return {*} - Server response
   */
  static getEvent(req, res) {
    return models.events
      .find({
        include: [
          {
            model: models.centers,
            as: 'center'
          }
        ],
        where: {
          $and: [{ userId: req.user.id }, { id: req.params.id }]
        }
      })
      .then((event) => {
        if (!event) {
          return res.status(404).json({
            status: 'error',
            errors: { event: ['Event not found.'] }
          });
        }

        return res.status(200).json({
          event: event.toJSON()
        });
      })
      .catch(() => {
        res.status(500).send({
          status: 'error',
          message: 'Internal Server Error'
        });
      });
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
        return res.status(404).json({
          status: 'error',
          errors: { event: ['Event does not exist'] }
        });
      }

      const modifiedEvent = { ...event.toJSON(), ...req.body };

      const dateError = validate(
        {
          startDate: modifiedEvent.startDate,
          endDate: modifiedEvent.endDate
        },
        {
          startDate: validationRules.startDate,
          endDate: validationRules.endDate
        }
      );

      if (dateError !== undefined) {
        return res.status(422).json({
          status: 'error',
          errors: { ...dateError }
        });
      }

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
        return res.status(404).json({
          status: 'error',
          errors: { centerId: ['Invalid center'] }
        });
      }

      const bookedCenter = await models.events.findOne({
        where: {
          centerId: modifiedEvent.centerId,
          $or: bookedQueryParams(modifiedEvent.startDate, modifiedEvent.endDate)
        }
      });

      if (bookedCenter && bookedCenter.id !== event.id) {
        return res.status(409).json({
          status: 'error',
          errors: { title: ['Center has already been booked.'] }
        });
      }

      return models.events
        .update(modifiedEvent, {
          where: { id: req.params.id }
        })
        .then(() => {
          res.status(200).json({ event: modifiedEvent });
        });
    } catch (e) {
      return res.status(500).send({
        status: 'error',
        message: 'Internal Server Error'
      });
    }
  }
}
