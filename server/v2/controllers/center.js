import sequelize from 'sequelize';
import moment from 'moment';
import validate from 'validate.js';
import Center, { create, updateCenter } from './_support/Center';
import models from '../models';
import { contactValidationRules } from '../validate/contactValidationRules';

module.exports = {
  async createCenter(req, res) {
    try {
      const center = new Center(req.body);
      if (!center.safe()) {
        return res.status(422).json(center.getErrors());
      }

      req.body.ownerid = req.user.id;
      const centerOwner = await models.users.findById(req.body.ownerid);

      if (!centerOwner) {
        return res.status(422).send({ global: 'Center must have a valid owner' });
      }

      // Check if this center has newContact and there is contact body
      // Contact must be linked to user account
      // The is ID of the new contact created is added to center details

      if (req.body.newContact && req.body.contact) {
        req.body.contact.ownerid = req.body.ownerid;
        const contactErrors = validate(req.body.contact, contactValidationRules);
        if (contactErrors !== undefined) return res.status(422).json({ contact: contactErrors });

        const newContact = await models.contacts.create(req.body.contact);
        req.body.contactid = newContact.id;
      } else {
        const contactExist = await models.contacts.findOne({
          where: { id: req.body.contactid, ownerid: req.user.id },
        });
        if (!contactExist) {
          return res.status(422).json({ contactid: 'Contact does not exist' });
        }
      }
      return create(req, res, models);
    } catch (e) {
      console.log(e);
      return res.status(500).send('Internal Server Error');
    }
  },
  getCenters(req, res) {
    return models.centers
      .findAll()
      .then(centers => res.status(200).json(centers))
      .catch(() => res.status(500).send('Internal Server Error'));
  },
  getAdminCenters(req, res) {
    return models.centers
      .findAll({
        include: [
          {
            model: models.events,
            as: 'events',
          },
        ],
        where: {
          ownerid: req.user.id,
        },
      })
      .then(center => res.status(200).json(center))
      .catch(() => res.status(500).send('Internal Server Error'));
  },
  getCenter(req, res) {
    return models.centers
      .findById(req.params.id)
      .then((center) => {
        if (!center) {
          return res.status(404).json({ center: 'Center not found' });
        }
        return res.status(200).json(center);
      })
      .catch(() => res.status(500).send('Internal Server Error'));
  },
  async editCenter(req, res) {
    try {
      const center = await models.centers.find({
        where: { id: req.params.id, ownerid: req.user.id },
      });

      if (!center) return res.status(422).json({ center: 'Center does not exist' });

      const mCenter = new Center(center.toJSON()).load(req.body);

      if (!mCenter.safe()) {
        return res.status(422).json({ validation: mCenter.getErrors() });
      }

      req.body = Object.assign({}, req.body, mCenter.toJSON());

      if (req.body.newContact && req.body.contact) {
        req.body.contact.ownerid = req.body.ownerid;

        const contactErrors = validate(req.body.contact, contactValidationRules);

        if (contactErrors !== undefined) return res.status(422).json(contactErrors);

        const contact = await models.contacts.create(req.body.contact);
        req.body.contactid = contact.id;
      }
      return updateCenter(req, res, models);
    } catch (e) {
      return res.status(500).send('Internal Server Error');
    }
  },
  getCenterWithEvents(req, res) {
    return models.centers
      .findOne({
        include: [
          {
            model: models.events,
            as: 'events',
          },
        ],
        where: {
          id: req.params.id,
          ownerid: req.user.id,
        },
      })
      .then(center => res.status(200).json(center))
      .catch(error => res.status(500).json(error));
  },
  getCenterByDate(req, res) {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    return models.events
      .findAll({
        where: {
          $or: [
            {
              $and: [
                { startdate: { [sequelize.Op.lte]: startDate } },
                { enddate: { [sequelize.Op.gte]: startDate } },
              ],
            },
            {
              $and: [
                { startdate: { [sequelize.Op.lte]: endDate } },
                { enddate: { [sequelize.Op.gte]: endDate } },
              ],
            },
          ],
        },
      })
      .then(centers => res.status(200).json(centers))
      .catch(error => res.status(500).json(error));
  },
  getContacts(req, res) {
    return models.contacts
      .findAll({
        where: {
          ownerid: req.user.id,
        },
      })
      .then(contacts => res.status(200).json(contacts))
      .catch(() => {
        res.status(500).send('Internal Server Error');
      });
  },
  search(req, res) {
    const {
      name, area, state, capacity, type, facilities, amount,
    } = req.query;

    let searchCondition = '';

    if (name && name.length > 1) {
      searchCondition += ` AND lower(name) LIKE '%${name.toLowerCase()}%'`;
    }
    if (area && area.length > 1) {
      searchCondition += ` AND lower(area) LIKE '%${area.toLowerCase()}%'`;
    }

    const stateInt = parseInt(state, 10);
    if (state && stateInt >= 0 && stateInt < 36) searchCondition += ` AND state='${state}'`;
    if (capacity && parseInt(capacity, 10) > 0) searchCondition += ` AND capacity='${capacity}'`;

    const typeInt = parseInt(type, 10);
    if (type && typeInt >= 0) searchCondition += ` AND type='${type}'`;

    const amountInt = parseInt(amount, 10);
    if (amount && amountInt >= 1) searchCondition += ` AND amount='${amountInt}'`;

    if (facilities) {
      const facilitiesBuilt = `(${facilities
        .split(',')
        .map((facility, i) => {
          const facilityLowerCase = facility.toLowerCase();
          return i === 0
            ? `lower(facilities) LIKE '%${facilityLowerCase}%'`
            : ` OR lower(facilities) LIKE '%${facilityLowerCase}'`;
        })
        .join()})`;
      searchCondition += ` AND ${facilitiesBuilt}`;
    }
    const END_OF_FIRST_AND = 3;
    searchCondition = `WHERE${searchCondition
      .trim()
      .substr(END_OF_FIRST_AND, searchCondition.length)}`;

    return models.sequelize
      .query(`SELECT * FROM centers ${searchCondition}`, {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(centers => res.status(200).json(centers))
      .catch(() => res.status(500).send('Internal Server Error'));
  },
  getOwnEvents(req, res) {
    return models.sequelize
      .query(
        'SELECT *, events.id as eid FROM events, centers WHERE events.centerid = centers.id AND centers.ownerid = :ownerid',
        { replacements: { ownerid: req.user.id }, type: sequelize.QueryTypes.SELECT },
      )
      .then((events) => {
        const eventsWithActiveStatus = events.map((e) => {
          const event = e;
          const enddate = moment(event.enddate);
          const now = moment();
          event.isConcluded = now.diff(enddate, 'days') > 0;
          return event;
        });
        res.status(200).json(eventsWithActiveStatus);
      })
      .catch(() => res.status(500).send('Internal Server Error'));
  },
};
