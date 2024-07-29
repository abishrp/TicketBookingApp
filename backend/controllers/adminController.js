const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Check if the provided credentials match the hardcoded ones
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    // Generate a JWT token
    const token = jwt.sign({ email }, process.env.ADMIN_SECRET, { expiresIn: '1d' });

    return res.status(200).json({ message: 'Login successful', token });
  } else {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
};
