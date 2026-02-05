const express = require('express');

function validateTaskIdParam(req, res, next) {
  const taskId = Number(req.params.taskId);

  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({ error: 'taskId must be a positive integer' });
  }

  req.taskId = taskId;
  next();
}

function validateStatusParam(req, res, next) {
  const normalized = (req.params.status || '').toLowerCase();

  if (normalized !== 'complete' && normalized !== 'incomplete') {
    return res.status(400).json({ error: 'status must be complete or incomplete' });
  }

  req.statusFilter = normalized === 'complete';
  next();
}

function createListViewRouter(tasks) {
  const router = express.Router();

  router.get('/tasks', (req, res) => {
    res.json(tasks);
  });

  router.get('/tasks/:taskId', validateTaskIdParam, (req, res) => {
    const task = tasks.find((item) => item.id === req.taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  });

  router.get('/tasks/status/:status', validateStatusParam, (req, res) => {
    const filtered = tasks.filter((task) => task.isCompleted === req.statusFilter);
    res.json(filtered);
  });

  return router;
}

module.exports = createListViewRouter;
