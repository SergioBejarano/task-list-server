const express = require('express');

function ensurePostPayload(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'POST body is required' });
  }

  const { description, isCompleted } = req.body;

  if (typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({ error: 'Valid description is required' });
  }

  if (isCompleted !== undefined && typeof isCompleted !== 'boolean') {
    return res.status(400).json({ error: 'isCompleted must be boolean when present' });
  }

  req.body.description = description.trim();
  next();
}

function ensurePutPayload(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'PUT body is required' });
  }

  const { description, isCompleted } = req.body;

  if (description === undefined && isCompleted === undefined) {
    return res.status(400).json({ error: 'Provide description or isCompleted to update' });
  }

  if (description !== undefined) {
    if (typeof description !== 'string' || description.trim() === '') {
      return res.status(400).json({ error: 'description must be a non-empty string' });
    }
    req.body.description = description.trim();
  }

  if (isCompleted !== undefined && typeof isCompleted !== 'boolean') {
    return res.status(400).json({ error: 'isCompleted must be boolean when present' });
  }

  next();
}

function createListEditRouter(tasks) {
  const router = express.Router();

  router.post('/tasks', ensurePostPayload, (req, res) => {
    const { description, isCompleted = false } = req.body;

    const newTask = {
      id: Date.now(),
      description,
      isCompleted,
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  });

  router.delete('/tasks/:taskId', (req, res) => {
    const taskId = Number(req.params.taskId);
    const index = tasks.findIndex((task) => task.id === taskId);

    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const [removedTask] = tasks.splice(index, 1);
    res.json(removedTask);
  });

  router.put('/tasks/:taskId', ensurePutPayload, (req, res) => {
    const taskId = Number(req.params.taskId);
    const task = tasks.find((item) => item.id === taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const { description, isCompleted } = req.body;

    if (description !== undefined) {
      task.description = description;
    }

    if (isCompleted !== undefined) {
      task.isCompleted = isCompleted;
    }

    res.json(task);
  });

  return router;
}

module.exports = createListEditRouter;
