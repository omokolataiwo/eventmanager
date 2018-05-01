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
        return res.status(422).json({
          status: 'error',
          errors: [{ centerId: ['Invalid center'] }]
        });
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
          .json({
            status: 'error',
            errors: [{
              center: ['Center has already been booked.']
            }]
          });
      }

      event.userId = req.user.id;
      event.active = 1;

      return models.events
        .create(event)
        .then(newEvent => res.status(201).json({ data: newEvent }));
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
          errors: [
            { event: ['Event does not exist.'] }
          ]
        });
      }

      return models.events
        .destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ data: event }));
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
    const LIMIT = 2;
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
        order: [['id', 'DESC']],
      })
      .then(events => res.status(200).json(events ? {
        data: {
          centers: events.rows,
          count: events.count
        }
      } : { data: { events: ['No Event Found'] } }))
      .catch(() => res.status(500).send({
        status: 'error',
        message: 'Internal Server Error'
      }));
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
        return res.status(422).json({
          status: 'error',
          errors: [
            { event: ['Event does not exist'] }
          ]
        });
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
        return res.status(422).json({
          status: 'error',
          errors: [
            { centerId: ['Invalid center'] }
          ]
        });
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
          .json({
            status: 'error',
            errors: [
              { center: ['Center has already been booked.'] }
            ]
          });
      }

      return models.events
        .update(modifiedEvent, {
          where: { id: req.params.id }
        })
        .then(() => {
          res.status(200).json({ data: modifiedEvent });
        });
    } catch (e) {
      return res.status(500).send({
        status: 'error',
        message: 'Internal Server Error'
      });
    }
  }
}
