const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose').default || require('passport-local-mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);