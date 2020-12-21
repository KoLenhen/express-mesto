/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
    }],
    default: [],
  },
});

module.exports = mongoose.model('card', cardSchema);
