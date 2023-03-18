import jwt from 'jsonwebtoken';
import { User } from '../models/index';

const verifyToken = async (req, res, next) => {
  console.log(req.headers);
  let token = req.headers['x-access-token'] || req.headers['Authorization'] || req.headers['authorization'];
  token = token.replace('Bearer ', '');

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({where: {id: decoded.id}});
    req.user = user.dataValues;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

export { verifyToken };