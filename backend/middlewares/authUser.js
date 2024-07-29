const jwt = require('jsonwebtoken');
const db = require('../config/database');

const authenticate = async (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.headers['authorization']; 

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.USER_SECRET);

    // Fetch the user from the database
    const user = await db.User.findByPk(decoded.id); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = authenticate;
