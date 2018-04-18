import jwt from 'jsonwebtoken';
import { ACCOUNT_TYPE_ADMIN } from '../routes/const';

/**
 * Admin authentication middleware
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {object} next  - Next middleware
 * @return {*} - Server response
 */
export default (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(422).json({ auth: false, message: 'No token provided' });
  }
  return jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res
        .status(401)
        .json({ auth: false, message: 'Failed to authenticate token.' });
    }

    if (decoded.role !== ACCOUNT_TYPE_ADMIN) {
      return res.status(403).json({ auth: false, message: 'Not authorized' });
    }
    req.user = decoded;
    return next();
  });
};
