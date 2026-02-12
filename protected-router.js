const express = require('express');
const jwt = require('jsonwebtoken');

function authenticateToken(jwtSecret) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header with Bearer token is required' });
    }
    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Authorization header must use Bearer scheme' });
    }
    try {
      const payload = jwt.verify(token, jwtSecret);
      req.user = payload;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
}

function createProtectedRouter(jwtSecret) {
  if (!jwtSecret) throw new Error('JWT secret is required');
  const router = express.Router();
  router.get('/protected', authenticateToken(jwtSecret), (req, res) => {
    res.json({ message: 'Protected content accessible', user: req.user });
  });
  return router;
}

module.exports = createProtectedRouter;
