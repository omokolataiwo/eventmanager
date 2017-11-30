import Center from './_support/center';
import models from '../models';

module.exports = {
  createCenter(req, res) {

    const fields = Center.getFields();
    const len = fields.length;
    let i = -1;

    while (i < len) {
      if (!Center[fields [i] + 'Validate'](req.body[fields[i]], res)) {
        return;
      }
      i += 1;
    }

    req.body.ownerid = req.user.id;

    return models.users.findById(req.body.ownerid)
    .then((user) => {
      if (!user) {
        return res.status(400).send('Center must have a valid owner');
      }

      return models.centers.create(req.body).then((center) => {
        return res.status(200).json(center);
      }).catch((error) => res.status(400).send(error));

    });
  },

  centers(req, res) {
    return models.centers
    .all()
    .then((centers) => res.status(200).json(centers))
    .catch((error) => res.status(400).send(error));
  },
  center(req, res) {
    
    if (!req.params.id || parseInt(req.params.id) != req.params.id) {
      return res.status(400).send("Invalid center");
    }

    return models.centers
    .findById(req.params.id)
    .then((center) => {
      if (!center) {
        return res.status(404).json({ message: 'Center not found' });
      }

      return res.status(200).json(center);
    })
    .catch((error) => res.status(400).send(error));
  },
  editCenter(req, res) {
    if (!req.params.id || parseInt(req.params.id) != req.params.id) {
      return res.status(400).send("Invalid center");
    }

    models.centers.findById(req.params.id)
    .then((center) => {
      center = center.toJSON();


      Object.keys(center).forEach((field) => {
        center[field] = req.body[field] ? req.body[field] : center[field];
      });  

      const fields = Center.getFields();
      const len = fields.length;
      let i = -1;

      while (++i < len) {
        if (!Center[fields[i] + 'Validate'](center[fields[i]], res)) {
          return;
        }
      }

      return models.centers.update(center, {
        where: { id: req.params.id },
      }).then((center) => {
        res.status(200).json(center);
      })
    })
    .catch((error) => res.status(400).send(error));
  },
};
