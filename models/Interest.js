const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema(
  {
    name_fr: {
      type: String,
      required: true,
    },
    name_en: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('interest', interestSchema);
