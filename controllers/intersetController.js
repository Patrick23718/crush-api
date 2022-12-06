const Interest = require('../models/Interest');

exports.createInterest = async (req, res) => {
  try {
    const interest = new Interest({
      name_en: req.body.name_en,
      name_fr: req.body.name_fr,
    });
    const save = await interest.save();
    return res.status(201).json(save);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.getAllInterest = async (req, res) => {
  try {
    const interests = await Interest.find();
    if (interests.length === 0)
      return res.status(404).json({ message: 'Not Found' });
    return res.status(200).json(interests);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
