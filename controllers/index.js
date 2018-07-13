const express = require('express'),
  router = express.Router(),
  user = require('../models/user');

/**
 * POST: Creates new uniq user by name
 */
router.post('/api/exercise/new-user', (req, res) => {
  const cb = (err, data) => {
    if (err) {
      return res.status(400).json({ error: 'user already exists' });
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
  // const cb = (err, data) => {
  //   if (err) {
  //     return res.status(400).json({ error: err });
  //   }
  //   const tmp = data.exercises[0];
  //   res.json({
  //     date: tmp.date,
  //     duration: tmp.duration,
  //     description: tmp.description
  //   });
  // };
  // const obj = {
  //   userId: req.body.userId,
  //   description: req.body.description,
  //   duration: req.body.duration,
  //   date: req.body.date,
  // };
  // user.addExercise(obj, cb);
  res.status(200);
});

/**
 * GET: Index page.
 */
router.get('/', (req, res) => {
  res.render('index', {});
});


module.exports = router;
