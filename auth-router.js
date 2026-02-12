const express = require('express');
const jwt = require('jsonwebtoken');

const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'editor', password: 'editor123', role: 'editor' },
  { id: 3, username: 'viewer', password: 'viewer123', role: 'viewer' },
];

function createAuthRouter(jwtSecret) {
  if (!jwtSecret) throw new Error('JWT secret is required');
  const router = express.Router();

  router.post('/login', (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' });
    }
    const user = users.find((item) => item.username === username && item.password === password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { sub: user.id, username: user.username, role: user.role },
      jwtSecret,
      { expiresIn: '1h' },
    );
    res.json({ token });
  });

  return router;
}

module.exports = createAuthRouter;
