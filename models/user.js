/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        // eslint-disable-next-line max-len
        return /^https?(www\.)?[\-\.\_\~\:\/\\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=a-zA-Z0-9]*\#?$/.test(v);
      },
      message: 'wrong picture url address',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
