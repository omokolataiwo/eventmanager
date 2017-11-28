import database from '../db.json';
import Center from './_support/center';

module.exports = {
  createCenter(req, res) {
    const center = new Center(req.body);
    let centers = database.centers;
    const newCenterKey = database.keys.centers;
    center.setId(newCenterKey);

    center.validate();
    if (!center.safe()) {
      return res.status(406).json({ error: true, message: center.getErrors() });
    }
    centers[newCenterKey] = center.toJSON();
    database.keys.centers += 1;
    return res.status(200).json({ error: false, "center": center.toJSON() });
  },

  centers(req, res) {
    return res.status(200).json(database.centers);
  },
  center(req, res) {
    res.status(200).json(database.centers[req.params.id] || {});
  },
  editCenter(req, res) {
    const id = req.params.id;
    let centers = database.centers;

    if (!centers[id]) {
      return res.status(400).json({ error: true, message: 'Invalid center' });
    }
    const center = new Center(centers[id]);
    center.load(req.body);
    center.setId(id);
    
    center.validate();
    if (!center.safe()) {
      return res.status(406).json({ error: true, message: center.getErrors() });
    }
    centers[id] = center.toJSON();
    return res.status(201).send({ error: false, center: center.toJSON() });
  },
};
