import validator from 'validator';
import util from './base';
import models from '../../models';

class Center {

  static getFields() {
    return ['name', 'capacity', 'address', 'state', 'facilities', 'amount'];
  }

  static nameValidate(value, res) {
    if (validator.isEmpty(util.toValidatorString(value))) {
      res.status(400).send('Center name can not be empty.');
      return false;
    }
    return true;
  }

  static capacityValidate(value, res) {
    if (!validator.isInt(util.toValidatorString(value)) || parseInt(value) < 1) {
      res.status(400).send('Center capacity is not a number or capacity too small.');
      return false;
    }
    return true;
  }

  static addressValidate(value, res) {
    if (value.trim().length === 0) {
      res.status(400).send('Center must have an address.');
      return false;
    }
    return true;
  }

  static stateValidate(value, res) {
    const stateCode = Math.floor(parseInt(value));
    if (!validator.isInt(util.toValidatorString(stateCode)) || stateCode < 1 || stateCode > 37) {
      res.status(400).send('Center state must be a state code');
      return false;
    }
    return true;
  }

  static facilitiesValidate(value, res) {
    return true;
  }

  static amountValidate(value, res) {
    if (!validator.isInt(util.toValidatorString(value)) || value < 0) {
      return res.status(400).send('Amount given must be a number');
      return false;
    }
    return true;
  }
  /**/


  static save(id, res, req) {
    if (!this.safe()) {
      return false;
    }

    if (id) {
      return this.mCenter.update(req.body, {
        where: { id: req.params.id },
      });
    }

    return this.mCenter.create(this.toJSON());
  }

  update(res, req) {
    console.log("fffffi");
    return this.mCenter.findOne({
      where: { id: req.params.id },
    }).then((center) => {
      console.log(center);
      if (!center) {
        res.status(401).send({ error: true, message: 'Invalid center' });
      }
      console.log(center.get({ plain: true }));

      const existingCenter = new Center(center.toJSON());
      existingCenter.load(req.body);
      return existingCenter.save(center.id);
    }).catch((error) => res.status(400).send(error));
  }

  validate() {
    
    

    

    

    if (!validator.isInt(this.toValidatorString(this.ownerid)) && this.ownerid < 1) {
      this.errorMessages.ownerid = 'Center must have an owner';
      this.error = true;
    }
    /*
    this.userExist(this.ownerid).then((owner) => {
      return owner;
    }, function(res){
      console.log("this is result");
    });
    */
    
    return this.error;
  }

  /*userExist(id) {
    ;
  }*/
  
  toJSON() {
    return {
      name: this.name,
      capacity: this.capacity,
      address: this.address,
      state: this.state,
      facilities: this.facilities,
      amount: this.amount,
      ownerid: this.ownerid,
    };
  }
}
export { Center as default };
