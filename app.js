const express = require('express');
const createListViewRouter = require('./list-view-router');
const createListEditRouter = require('./list-edit-router');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.use(createListViewRouter(tasks));
app.use(createListEditRouter(tasks));

app.listen(PORT, () => {
  console.log(`Task list server listening on port ${PORT}`);
});
