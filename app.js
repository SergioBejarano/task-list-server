const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Task list server listening on port ${PORT}`);
});
