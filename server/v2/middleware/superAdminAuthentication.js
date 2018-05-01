import jwt from 'jsonwebtoken';
import { ACCOUNT_TYPE_SUPER_ADMIN } from './const';

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
    return res.status(422).json({
      status: 'error',
      errors: [
        { message: ['No token provided'] }
      ]
    });
  }
  return jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        status: 'error',
        errors: [
          { message: ['Failed to authenticate token.'] }
        ]
      });
    }

    if (decoded.role !== ACCOUNT_TYPE_SUPER_ADMIN) {
      return res.status(403).json({
        status: 'error',
        errors: [
          { message: ['Not authorized'] }
        ]
      });
    }
    req.user = decoded;
    return next();
  });
};
