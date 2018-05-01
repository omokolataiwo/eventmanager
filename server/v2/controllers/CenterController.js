import sequelize from 'sequelize';
import moment from 'moment';
import models from '../models';
import {
  PENDING_CENTER,
  ACTIVE_CENTER,
  APPROVED_CENTER,
  DECLINED_CENTER,
  CANCEL_EVENT
} from '../middleware/const';

/**
 * CenterController
 *
 * @export
 * @class CenterController
 */
export default class CenterController {
  /**
   * Create a new center
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @return {*} - Server response
   */
  static async createCenter(req, res) {
    try {
      const center = req.body;
      center.ownerId = req.user.id;

      const existingCenter = await models.centers.findOne({
        where: {
          $and: [
            { name: center.name },
            { address: center.address },
            { area: center.area },
            { state: center.state }
          ]
        }
      });

      if (existingCenter) {
        return res.status(409).json({
          status: 'error',
          errors: [{ name: 'Center already exist' }]
        });
      }

      if (center.newContact && center.contact) {
        center.contact.ownerId = center.ownerId;
        const newContact = await models.contacts.create(center.contact);
        center.contactId = newContact.id;
      } else {
        const contactExist = await models.contacts.findOne({
          where: { id: center.contactId, ownerId: req.user.id }
        });

        if (!contactExist) {
          return res.status(422).json({
            status: 'error',
            errors: [{ contactId: ['Contact does not exist'] }]
          });
        }
      }

      center.approve = PENDING_CENTER;
      center.active = ACTIVE_CENTER;

      return models.centers
        .create(center)
        .then(newCenter => res.status(201).json({ data: { newCenter } }));
    } catch (e) {
      return res.status(500).send({
        status: 'error',
        message: 'Internal Server Error'
      });
    }
  }

  /**
   * Get all registered center
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @returns {*} - Server response
   */
  static getCenters(req, res) {
    const LIMIT = 3;
    const page = parseInt(req.query.page, 10) - 1 || 0;

    return models.centers
      .findAndCountAll({
        where: {
          $and: [{ approve: APPROVED_CENTER }, { active: ACTIVE_CENTER }]
        },
        limit: LIMIT,
        offset: LIMIT * page,
        order: [['id', 'DESC']]
      })
      .then(centers =>
        res.status(200).json(centers
          ? {
            data: {
              centers: centers.rows,
              count: centers.count
            }
          }
          : { data: { center: ['No Center Found'] } }))
      .catch((error) => {
        res.status(500).send({
          status: 'error',
          message: 'Internal Server Error'
        });
      });
  }
  /**
   * Get all centers with events registered by authenticated user
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @returns {*} - Server response
   */
  static getAdminCenters(req, res) {
    const LIMIT = 2;
    const page = req.query.page - 1 || 0;

    return models.centers
      .findAndCountAll({
        include: [
          {
            model: models.events,
            as: 'events'
          }
        ],
        where: {
          ownerId: req.user.id
        },
        limit: LIMIT,
        offset: LIMIT * page,
        order: [['id', 'DESC']]
      })
      .then(centers =>
        res.status(200).json(centers
          ? {
            data: {
              centers: centers.rows,
              count: centers.count
            }
          }
          : { data: { center: ['No Center Found'] } }))
      .catch(() =>
        res.status(500).send({
          status: 'error',
          message: 'Internal Server Error'
        }));
  }
  /**
   * Get a single center
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @returns {*} - Server response
   */
  static getCenter(req, res) {
    return models.centers
      .find({
        where: {
          $and: [
            { id: req.params.id },
            { approve: APPROVED_CENTER },
            { active: ACTIVE_CENTER }
          ]
        }
      })
      .then((center) => {
        if (!center) {
          return res.status(404).json({
            status: 'error',
            errors: [{ center: ['Center not found'] }]
          });
        }
        return res.status(200).json({ data: { center } });
      })
      .catch(() =>
        res.status(500).send({
          status: 'error',
          message: 'Internal Server Error'
        }));
  }
  /**
   * Update Center
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @returns {*} - Server response
   */
  static async editCenter(req, res) {
    try {
      const existingCenter = await models.centers.find({
        where: { id: req.params.id, ownerId: req.user.id }
      });

      if (!existingCenter) {
        return res.status(422).json({
          status: 'error',
          errors: [
            {
              center: ['Center does not exist']
            }
          ]
        });
      }

      const {
        name,
        capacity,
        address,
        amount,
        state,
        facilities,
        area,
        type,
        image,
        contactId,
        details,
        newContact,
        contact,
        active
      } = req.body;

      const modifiedCenter = Object.assign({}, existingCenter.toJSON(), {
        name,
        capacity,
        address,
        amount,
        state,
        facilities,
        area,
        type,
        image,
        contactId,
        details,
        newContact,
        contact,
        active
      });

      const registeredBefore = await models.centers.findOne({
        where: {
          $and: [{ name }, { address }, { area }, { state }]
        }
      });

      if (registeredBefore && registeredBefore.id !== existingCenter.id) {
        return res.status(409).json({
          status: 'error',
          errors: [{ name: 'Center already exist' }]
        });
      }

      if (modifiedCenter.newContact && modifiedCenter.contact) {
        modifiedCenter.contact.ownerId = modifiedCenter.ownerId;

        const contact = await models.contacts.create(modifiedCenter.contact);
        modifiedCenter.contactId = contact.id;
      } else {
        const contactExist = await models.contacts.findOne({
          where: { id: modifiedCenter.contactId, ownerId: req.user.id }
        });

        if (!contactExist) {
          return res.status(422).json({
            status: 'error',
            errors: [
              {
                contactId: ['Contact does not exist']
              }
            ]
          });
        }
      }

      return models.centers
        .update(modifiedCenter, {
          where: { id: req.params.id }
        })
        .then(() => res.status(201).json({ data: modifiedCenter }));
    } catch (e) {
      return res.status(500).send({
        status: 'error',
        message: 'Internal Server Error'
      });
    }
  }
  /**
   * Get all registered contact
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @returns {*} - Server response
   */
  static getContacts(req, res) {
    return models.contacts
      .findAll({
        where: {
          ownerId: req.user.id
        }
      })
      .then(contacts => res.status(200).json({ data: contacts }))
      .catch(() => {
        res.status(500).send({
          status: 'error',
          message: 'Internal Server Error'
        });
      });
  }
  /**
   * Search for center base on centers parameters
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @returns {*} - Server response
   */
  static search(req, res) {
    const {
      name, area, state, capacity, type, facilities, amount
    } = req.query;

    let searchCondition = '';

    if (name && name.length > 1) {
      searchCondition += ` AND lower(name) LIKE '%${name.toLowerCase()}%'`;
    }
    if (area && area.length > 1) {
      searchCondition += ` AND lower(area) LIKE '%${area.toLowerCase()}%'`;
    }

    const stateInt = parseInt(state, 10);
    if (state && stateInt >= 0 && stateInt < 36) {
      searchCondition += ` AND state='${state}'`;
    }
    if (capacity && parseInt(capacity, 10) > 0) {
      searchCondition += ` AND capacity='${capacity}'`;
    }

    const typeInt = parseInt(type, 10);
    if (type && typeInt >= 0) searchCondition += ` AND type='${type}'`;

    const amountInt = parseInt(amount, 10);
    if (amount && amountInt >= 1) {
      searchCondition += ` AND amount='${amountInt}'`;
    }

    if (facilities) {
      const facilitiesBuilt = `(${facilities
        .split(',')
        .map((facility, i) => {
          const facilityLowerCase = facility.toLowerCase();
          return i === 0
            ? `lower(facilities) LIKE '%${facilityLowerCase}%'`
            : ` OR lower(facilities) LIKE '%${facilityLowerCase}'`;
        })
        .join('')})`;

      searchCondition += ` AND ${facilitiesBuilt}`;
    }
    const END_OF_FIRST_AND = 3;

    if (!searchCondition) {
      return res.status(404).send({
        status: 'error',
        errors: [{ search: ['Center not found.'] }]
      });
    }
    searchCondition = `WHERE${searchCondition
      .trim()
      .substr(END_OF_FIRST_AND, searchCondition.length)}`;

    const LIMIT = 2;
    const OFFSET = (req.query.page - 1 || 0) * LIMIT;

    return models.sequelize
      .query(
        `SELECT *, 
        (SELECT COUNT(*) FROM centers ${searchCondition} AND active=${ACTIVE_CENTER} AND approve=${APPROVED_CENTER}) as count 
        FROM centers ${searchCondition} AND active=${ACTIVE_CENTER} AND approve=${APPROVED_CENTER} ORDER BY id DESC LIMIT ${LIMIT} OFFSET ${OFFSET}`,
        {
          type: sequelize.QueryTypes.SELECT
        }
      )
      .then(centers => res.status(200).json({ data: centers }))
      .catch(() =>
        res.status(500).send({
          status: 'error',
          message: 'Internal Server Error'
        }));
  }
  /**
   * Get all events
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @returns {*} - Server response
   */
  static getOwnEvents(req, res) {
    return models.sequelize
      .query(
        'SELECT *, events.id as eid FROM events, centers WHERE events."centerId" = centers.id AND centers."ownerId" = :ownerId',
        {
          replacements: { ownerId: req.user.id },
          type: sequelize.QueryTypes.SELECT
        }
      )
      .then((events) => {
        const eventsWithActiveStatus = events.map((e) => {
          const event = e;
          const endDate = moment(event.endDate);
          const now = moment();
          event.isConcluded = now.diff(endDate, 'days') > 0;
          return event;
        });
        res.status(200).json({ data: eventsWithActiveStatus });
      })
      .catch(() => {
        res.status(500).send({
          status: 'error',
          message: 'Internal Server Error'
        });
      });
  }
  /**
   * Activate center
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @returns {*} - Server response
   * @memberof CenterController
   */
  static async approveCenter(req, res) {
    const centerId = req.params.id;
    const center = await models.centers.findById(centerId);

    if (!center) {
      return res.status(404).json({
        status: 'error',
        errors: [{ centerId: ['Can not find center'] }]
      });
    }

    return models.centers
      .update({ approve: APPROVED_CENTER }, { where: { id: centerId } })
      .then(() => res.status(201).json({ data: center }))
      .catch(() => {
        res.status(500).send({
          status: 'error',
          message: 'Internal Server Error'
        });
      });
  }

  /**
   * Cancel Center Creation Application
   *
   * @static
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @returns {*} - Server response
   * @memberof CenterController
   */
  static async declineCenter(req, res) {
    const centerId = req.params.id;
    const center = await models.centers.findById(centerId);

    if (!center) {
      return res.status(404).json({
        status: 'error',
        errors: [{ centerId: ['Can not find center'] }]
      });
    }

    return models.centers
      .update({ approve: DECLINED_CENTER }, { where: { centerId } })
      .then(() => res.status(201).json({ data: center }))
      .catch(() => {
        res.status(500).send({
          status: 'error',
          message: 'Internal Server Error'
        });
      });
  }

  /**
   * Cancel Event
   *
   * @static
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @returns {*} - Server response
   * @memberof CenterController
   */
  static cancelEvent(req, res) {
    return models.sequelize
      .query(
        'SELECT * FROM events, centers WHERE events."centerId" = centers.id AND centers."ownerId" = :ownerId AND events."id" = :eventId',
        {
          replacements: { ownerId: req.user.id, eventId: req.params.id },
          type: sequelize.QueryTypes.SELECT
        }
      )
      .then((events) => {
        if (!events.length) {
          return res.status(404).json({
            status: 'error',
            errors: [{ eventId: ['Event not found!'] }]
          });
        }
        return models.events
          .update({ active: CANCEL_EVENT }, { where: { id: req.params.id } })
          .then(() => res.status(201).json({ data: events }));
      })
      .catch(() => {
        res.status(500).send({
          status: 'error',
          message: 'Internal Server Error'
        });
      });
  }
}
