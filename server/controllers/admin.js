import database from '../models';
import Center from './_support/center';

module.exports = {
  createCenter(req, res) {
    const center = new Center(req.body);
    let centers = database.centers;
    const newCenterKey = database.keys.centers;

    center.validate();
    if (!center.safe()) {
      return res.json({ error: true, message: center.getErrors() });
    }
    centers[newCenterKey] = center.toJSON();
    database.keys.centers += 1;
    return res.json({ error: false });
  },

  centers(req, res) {
    return res.json(database.centers);
  },
  center(req, res) {
    res.json(database.centers[req.params.id] || {});
  },
  editCenter(req, res) {
    const id = req.params.id;
    let centers = database.centers;

    if (!centers[id]) {
      return res.json({ error: true, message: 'Invalid center' });
    }
    const center = new Center(centers[id]);
    center.load(req.body);
    center.validate();
    if (!center.safe()) {
      return res.json({ error: true, message: center.getErrors() });
    }
    centers[id] = center.toJSON();
    return res.send({ error: false });
  },
};
