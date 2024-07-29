const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET);

    // Check if the decoded token contains the admin email
    if (decoded.email === process.env.ADMIN_EMAIL) {
      // Attach the decoded token to the request object
      req.user = decoded;
      next(); // Proceed to the next middleware or route handler
    } else {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
  } catch (error) {
    // Handle token verification errors
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = authenticateAdmin;
