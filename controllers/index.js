const express = require('express'),
  router = express.Router(),
  user = require('../models/user');

/**
 * POST: Creates new uniq user by name
 */
router.post('/api/exercise/new-user', (req, res) => {
  const cb = (err, data) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json({
      userId: data['_id'],
      name: data.name
    });
  };
  user.save(req.body.name, cb);
});

/**
 * POST: Adds new exercise to user exercise collection by user id
 * returns last created exercise
 */
router.post('/api/exercise/add', (req, res) => {
  const cb = (err, data) => {
    if (err) {
      console.log('ERROR', err.message);
      return res.status(400).json({ error: err.message });
    }
    console.log('DATA', data);
    const tmp = data.exercises[0];
    res.json({
      date: tmp.date,
      duration: tmp.duration,
      description: tmp.description
    });
  };
  const obj = {
    userId: req.body.userId,
    description: req.body.description,
    duration: req.body.duration,
    date: req.body.date,
  };
  user.addExercise(obj, cb);
});

/**
 * GET: Index page.
 */
router.get('/', (req, res) => {
  res.render('index', {});
});

/**
 * GET: Users's exercise log
 * @example: query: ?userId=5b4b2987abe88b37cb6788fe&from=2018-07-01&to=2018-07-10&limit=10
 */
router.get('/api/exercise/log', (req, res) => {
  if (!req.query.userId) {
    return res.status(400).json({ error: 'userId is required' });
  }
  // console.log('XXXXXXX', req.query);
  const cb = (err, data) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json({ some: data });
  };
  user.log(req.query, cb);
});

module.exports = router;
