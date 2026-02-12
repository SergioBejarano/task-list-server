require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const createListViewRouter = require('./list-view-router');
const createListEditRouter = require('./list-edit-router');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('Missing JWT_SECRET environment variable. Set it in your .env file.');
  process.exit(1);
}

app.use(express.json());

const allowedMethods = new Set(['GET', 'POST', 'PUT', 'DELETE']);

app.use((req, res, next) => {
  if (!allowedMethods.has(req.method)) {
    return res.status(405).json({ error: 'HTTP method not allowed for this server' });
  }
  next();
});

const tasks = [
  {
    id: 123456,
    isCompleted: false,
    description: 'Walk the dog',
  },
  {
    id: 987654,
    isCompleted: true,
    description: 'Buy groceries',
  },
  {
    id: 555222,
    isCompleted: false,
    description: 'Schedule dentist appointment',
  },
];

const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'editor', password: 'editor123', role: 'editor' },
  { id: 3, username: 'viewer', password: 'viewer123', role: 'viewer' },
];

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header with Bearer token is required' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Authorization header must use Bearer scheme' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

app.post('/login', (req, res) => {
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
    JWT_SECRET,
    { expiresIn: '1h' },
  );

  res.json({ token });
});

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected content accessible', user: req.user });
});

app.use(createListViewRouter(tasks));
app.use(createListEditRouter(tasks));

app.listen(PORT, () => {
  console.log(`Task list server listening on port ${PORT}`);
});
