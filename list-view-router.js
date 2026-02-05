const express = require('express');

function createListViewRouter(tasks) {
  const router = express.Router();

  router.get('/tasks', (req, res) => {
    res.json(tasks);
  });

  router.get('/tasks/:taskId', (req, res) => {
    const taskId = Number(req.params.taskId);
    const task = tasks.find((item) => item.id === taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  });

  router.get('/tasks/status/:status', (req, res) => {
    const normalized = req.params.status.toLowerCase();

    if (normalized !== 'complete' && normalized !== 'incomplete') {
      return res.status(400).json({ error: 'Status must be complete or incomplete' });
    }

    const isCompleted = normalized === 'complete';
    const filtered = tasks.filter((task) => task.isCompleted === isCompleted);
    res.json(filtered);
  });

  return router;
}

module.exports = createListViewRouter;
