const express = require('express');

function createListEditRouter(tasks) {
  const router = express.Router();

  router.post('/tasks', (req, res) => {
    const { description, isCompleted = false } = req.body || {};

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const newTask = {
      id: Date.now(),
      description,
      isCompleted: Boolean(isCompleted),
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

  router.put('/tasks/:taskId', (req, res) => {
    const taskId = Number(req.params.taskId);
    const task = tasks.find((item) => item.id === taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const { description, isCompleted } = req.body || {};

    if (description === undefined && isCompleted === undefined) {
      return res.status(400).json({ error: 'Provide description or isCompleted to update' });
    }

    if (description !== undefined) {
      task.description = description;
    }

    if (isCompleted !== undefined) {
      task.isCompleted = Boolean(isCompleted);
    }

    res.json(task);
  });

  return router;
}

module.exports = createListEditRouter;
