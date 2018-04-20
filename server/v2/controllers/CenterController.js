import sequelize from 'sequelize';
import moment from 'moment';
import models from '../models';

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

      if (center.newContact && center.contact) {
        center.contact.ownerId = center.ownerId;
        const newContact = await models.contacts.create(center.contact);
        center.contactId = newContact.id;
      } else {
        const contactExist = await models.contacts.findOne({
          where: { id: center.contactId, ownerId: req.user.id }
        });

        if (!contactExist) {
          return res.status(422).json({ contactId: 'Contact does not exist' });
        }
      }

      return models.centers
        .create(center)
        .then(center => res.status(201).json(center));
    } catch (e) {
      return res.status(500).send('Internal Server Error');
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
    return models.centers
      .findAll()
      .then(centers => res.status(200).json(centers))
      .catch(() => res.status(500).send('Internal Server Error'));
  }
  /**
   * Get all centers with events registered by authenticated user
   *
   * @param {object} req - Server request
   * @param {object} res - Server response
   * @returns {*} - Server response
   */
  static getAdminCenters(req, res) {
    return models.centers
      .findAll({
        include: [
          {
            model: models.events,
            as: 'events'
          }
        ],
        where: {
          ownerId: req.user.id
        }
      })
      .then(center => res.status(200).json(center))
      .catch(() => res.status(500).send('Internal Server Error'));
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
      .findById(req.params.id)
      .then(center => {
        if (!center) {
          return res.status(404).json({ center: 'Center not found' });
        }
        return res.status(200).json(center);
      })
      .catch(() => res.status(500).send('Internal Server Error'));
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
        return res.status(422).json({ center: 'Center does not exist' });
      }

      let modifiedCenter = req.body;
      modifiedCenter.ownerid = req.user.id;

      if (modifiedCenter.newContact && modifiedCenter.contact) {
        modifiedCenter.contact.ownerid = modifiedCenter.ownerid;

        const contact = await models.contacts.create(modifiedCenter.contact);
        modifiedCenter.contactid = contact.id;
      } else {
        const contactExist = await models.contacts.findOne({
          where: { id: modifiedCenter.contactid, ownerid: req.user.id }
        });

        if (!contactExist) {
          return res.status(422).json({ contactid: 'Contact does not exist' });
        }
      }

      return models.centers
        .update(modifiedCenter, {
          where: { id: req.params.id }
        })
        .then(() => res.status(201).json(modifiedCenter));
    } catch (e) {
      return res.status(500).send('Internal Server Error');
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
      .then(contacts => res.status(200).json(contacts))
      .catch(() => {
        res.status(500).send('Internal Server Error');
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
    const { name, area, state, capacity, type, facilities, amount } = req.query;

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
    if (!searchCondition) return res.status(404).send('Center not found');

    searchCondition = `WHERE${searchCondition
      .trim()
      .substr(END_OF_FIRST_AND, searchCondition.length)}`;

    return models.sequelize
      .query(`SELECT * FROM centers ${searchCondition}`, {
        type: sequelize.QueryTypes.SELECT
      })
      .then(centers => res.status(200).json(centers))
      .catch(e => res.status(500).send(e));
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
        'SELECT *, events.id as eid FROM events, centers WHERE events.centerId = centers.id AND centers.ownerId = :ownerid',
        {
          replacements: { ownerid: req.user.id },
          type: sequelize.QueryTypes.SELECT
        }
      )
      .then(events => {
        const eventsWithActiveStatus = events.map(e => {
          const event = e;
          const endDate = moment(event.endDate);
          const now = moment();
          event.isConcluded = now.diff(endDate, 'days') > 0;
          return event;
        });
        res.status(200).json(eventsWithActiveStatus);
      })
      .catch(() => res.status(500).send('Internal Server Error'));
  }
}
