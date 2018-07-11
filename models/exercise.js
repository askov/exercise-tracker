const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports.schema = exerciseSchema;

module.exports.model = Exercise;

// module.exports.save = function (obj, cb) {
//   User.findById(obj.userId, function (err, data) {
//     if (err) return cb(err);
//     const exercise = new Exercise({
//       userId: obj.userId,
//       description: obj.description,
//       duration: obj.duration,
//       date: obj.date,
//     });
//     exercise.save(function (err, data) {
//       if (err) return cb(err);
//       cb(null, data);
//     });
//   });
// };





// module.exports.find = function (shortUrl, cb) {
//   let decoded;
//   try {
//     decoded = base64.decode(shortUrl);
//   } catch (err) {
//     return cb(err);
//   }
//   ShortUrl.findOne({
//     shortUrl: decoded
//   }, function (err, data) {
//     if (err) return cb(err);
//     if (!data) return cb(new Error('Not found'))
//     cb(null, data);
//   });
// };

// module.exports.last = function (cb) {
//   ShortUrl.find({}).sort({
//     shortUrl: -1
//   }).limit(3).exec(function (err, data) {
//     if (err) return cb(err);
//     cb(null, data);
//   });
// };
