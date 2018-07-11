const mongoose = require('mongoose'),
  excercise = require('./exercise');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  exercises: [excercise.schema]
});

const User = mongoose.model('User', userSchema);

module.exports.model = User;

module.exports.save = function (name, cb) {
  const user = new User({
    name
  });
  user.save(function (err, data) {
    if (err) return cb(err);
    cb(null, data);
  });
};

module.exports.addExercise = function (obj, cb) {
  User.findByIdAndUpdate(obj.userId, {
    $push: {
      exercises: {
        description: obj.description,
        duration: obj.duration,
        date: obj.date,
      }
    }
  }, {
      new: true,
    }).select({ exercises: { $slice: -1 }, _id: 0, name: 0 }).exec(function (err, data) {
      if (err) return cb(err);
      cb(null, data);
    })
};