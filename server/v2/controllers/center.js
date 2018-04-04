import sequelize from 'sequelize';
import moment from 'moment';
import validate from 'validate.js';
import { Center, create, update } from './_support/center';
import models from '../models';
import { parse } from 'url';
import { contactValidationRules } from '../validate/contactValidationRules';

module.exports = {
  createCenter(req, res) {
    const center = new Center(req.body);
    if (!center.safe()) {
      return res.status(400).json(center.getErrors());
    }

    req.body.ownerid = req.user.id;
    return models.users
      .findById(req.body.ownerid)
      .then((user) => {
        if (!user) {
          return res.status(400).send({ error: true, message: 'Center must have a valid owner' });
        }

        if (req.body.newContact && req.body.contact) {
          req.body.contact.ownerid = req.body.ownerid;
          const contactErrors = validate(req.body.contact, contactValidationRules);
          if (contactErrors !== undefined) {
            return res.status(400).json(contactErrors);
          }
          return models.contacts.create(req.body.contact).then((contact) => {
            req.body.contactid = contact.id;
            return create(req, res, models);
          });
        }
        return create(req, res, models);
      })
      .catch((error) => {
        console.log(error);
        res.status(501).send(error);
      });
  },
  getCenters(req, res) {
    return models.centers
      .findAll()
      .then(centers => res.status(200).json(centers))
      .catch(error => res.status(501).send(error));
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
      .catch(error => res.status(500).json(error));
  },
  getCenter(req, res) {
    return models.centers
      .findById(req.params.id)
      .then((center) => {
        if (!center) {
          return res.status(404).json({ message: 'Center not found' });
        }
        return res.status(200).json(center);
      })
      .catch(error => res.status(500).send(error));
  },
  editCenter(req, res) {
    return models.centers
      .find({
        where: {
          id: req.params.id,
          ownerid: req.user.id,
        },
      })
      .then((center) => {
        if (!center) {
          return res.status(401).json({ error: true, message: 'Center does not exist' });
        }

        const mCenter = new Center(center);
        mCenter.load(req.body);

        if (!mCenter.safe()) {
          return res.status(400).json({ error: true, message: mCenter.getErrors() });
        }
        req.body.center = mCenter.toJSON();
        if (req.body.newContact) {
          return models.contacts.create(req.body.contact).then((contact) => {
            req.body.contactid = contact.id;
            return update(req, res, models);
          });
        }
        return update(req, res, models);
      })
      .catch(error => res.status(501).send(error));
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
    return models.events
      .findAll({
        attributes: ['centerid'],
        where: {
          centerid: center.id,
          $or: [
            {
              $and: [
                { startdate: { [sequelize.Op.lte]: new Date(date) } },
                { enddate: { [sequelize.Op.gte]: new Date(date) } },
              ],
            },
            {
              $and: [
                { startdate: { [sequelize.Op.lte]: new Date(date) } },
                { enddate: { [sequelize.Op.gte]: new Date(date) } },
              ],
            },
          ],
        },
      })
      .then((centersid) => {
        return res.status(200).json(centersid);
      })
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
      .catch((error) => {
        res.status(400).send(error);
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

    const stateInt = parseInt(state);
    if (state && stateInt >= 0 && stateInt < 36) searchCondition += ` AND state='${state}'`;
    if (capacity && parseInt(capacity) > 0) searchCondition += ` AND capacity='${capacity}'`;

    const typeInt = parseInt(type);
    if (type && typeInt >= 0) searchCondition += ` AND type='${type}'`;

    const amountInt = parseInt(amount);
    if (amount && amountInt >= 1) searchCondition += ` AND amount='${amountInt}'`;

    if (facilities) {
      const facilitiesBuilt = `(${facilities
        .split(',')
        .map((facility, i) => {
          facility = facility.toLowerCase();
          i === 0
            ? `lower(facilities) LIKE '%${facility}%'`
            : ` OR lower(facilities) LIKE '%${facility}'`;
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
      .catch(e => console.log(e));
  },
  getOwnCenters(req, res) {
    return models.centers
      .findAll({
        where: {
          ownerid: req.user.id,
        },
      })
      .then(centers => res.status(200).json(centers))
      .catch(error => res.status(501).send(error));
  },
  getOwnEvents(req, res) {
    return models.sequelize
      .query(
        'SELECT *, events.id as eid FROM events, centers WHERE events.centerid = centers.id AND centers.ownerid = :ownerid',
        { replacements: { ownerid: req.user.id }, type: sequelize.QueryTypes.SELECT },
      )
      .then((events) => {
        events = events.map((event) => {
          const enddate = moment(event.enddate);
          const now = moment();
          event.isConcluded = now.diff(enddate, 'days') > 0;
          return event;
        });
        res.status(200).json(events);
      })
      .catch(e => console.log(e));
  },
};
