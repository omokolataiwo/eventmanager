import database from '../models';

module.exports = {
  createCenter(req, res) {
    const center = req.body;
    const { centers } = database;
    const newCenterKey = database.keys.centers + 1;

    centers[newCenterKey] = center;
    return res.json(centers);
  },

  centers(req, res) {
    res.send('All centers');
  },
  center(req, res) {
    res.send('Get center with id');
  },
  editCenter(req, res) {
    res.send('Edit center');
  },
};
