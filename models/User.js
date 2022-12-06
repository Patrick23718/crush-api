const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },

    interests: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'interest',
        },
      ],
      validate: [arrayLimit, '{PATH} exceeds the limit of 6'],
      unique: true,
    },

    name: {
      type: String,
      required: false,
    },

    email: {
      type: String,
      required: false,
    },

    birthdate: {
      type: Date,
      required: false,
    },

    phone_number: {
      type: String,
      required: false,
    },

    town: {
      type: String,
      required: false,
    },

    gender: {
      type: String,
      enum: ['M', 'F'],
      required: false,
    },

    image: {
      type: [String],
      required: false,
      validate: [arrayLimit, '{PATH} exceeds the limit of 6'],
    },

    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: false,
      },
      coordinates: {
        type: [Number],
        required: false,
      },
      required: false,
    },

    publish: {
      type: String,
      enum: ['AWAIT', 'PUBLISH'],
      default: 'AWAIT',
      required: true,
    },
  },
  { timestamps: true },
);

function arrayLimit(val) {
  return val.length <= 6;
}

module.exports = mongoose.model('users', userSchema);
