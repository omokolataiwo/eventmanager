import database from '../models';

module.exports = {
  createCenter(req, res) {
    let center = req.body;
    let centers = database.centers;
    let newCenterKey = database.keys.centers++;

    centers[newCenterKey] = center;
    return res.json(centers);
  },

  centers (req, res) {
    res.send('All centers');
  },
  center (req, res) {
    res.send('Get center with id');
  },
  editCenter (req, res) {
    res.send('Edit center');
  }
};
