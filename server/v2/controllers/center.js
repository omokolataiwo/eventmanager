import Center from './_support/center';
import models from '../models';

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
        return models.centers
          .create(req.body)
          .then(center => res.status(200).json(center))
          .catch(error => res.status(501).send(error));
      })
      .catch(error => res.status(501).send(error));
  },

  getCenters(req, res) {
    return models.centers
      .all()
      .then(centers => res.status(200).json(centers))
      .catch(error => res.status(400).send(error));
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
      .findById(req.params.id)
      .then((center) => {
        if (!center) {
          return res.status(401).json({ error: true, message: 'Center does not exist' });
        }
        
        const mCenter = new Center(center);
        mCenter.load(req.body);

        if (!mCenter.safe()) {
          return res.status(400).json({ error: true, message: mCenter.getErrors() });
        }
        return models.centers
          .update(mCenter.toJSON(), {
            where: { id: req.params.id },
          })
          .then((center) => {
            console.log(center);
            console.log(req.params.id);
            return res.status(200).json(center);
          });
      })
      .catch(error => res.status(400).send(error));
  },
};
