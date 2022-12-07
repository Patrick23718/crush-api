const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const interest = new User({
      uid: req.userId,
    });
    const save = await interest.save();
    return res.status(201).json(save);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.userId }).populate('interests');
    if (!user) return res.status(404).json({ message: 'Not Found' });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    let userData = {};

    if (req.body.name) userData.name = req.body.name;
    if (req.body.email) userData.email = req.body.email;
    if (req.body.birthdate) userData.birthdate = req.body.birthdate;
    if (req.body.phone_number) userData.phone_number = req.body.phone_number;
    if (req.body.gender) userData.gender = req.body.gender;
    if (req.body.location) userData.location = req.body.location;
    if (req.body.town) userData.town = req.body.town;

    const data = await User.update({ uid: req.userId }, { $set: userData });
    if (!data)
      return res.status(404).json({
        message: 'Not Found',
      });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.addImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({
      success: false,
    });
  }

  try {
    const data = await User.update(
      { uid: req.userId },
      { $push: { image: req.file.filename } },
    );
    if (!data)
      return res.status(404).json({
        message: 'Not Found',
      });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.removeImage = async (req, res) => {
  const fs = require('fs');

  const filePath = req.body.image;

  try {
    const data = await User.update(
      { uid: req.userId },
      { $pull: { image: filePath } },
    );
    if (!data)
      return res.status(404).json({
        message: 'Not Found',
      });

    fs.exists('uploads/profils/' + filePath, function (exists) {
      if (exists) {
        console.log('File exists. Deleting now ...');

        fs.unlinkSync('uploads/profils/' + filePath);
      } else {
        console.log('File not found, so not deleting.');
      }
    });

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.addInterest = async (req, res) => {
  try {
    const data = await User.update(
      { uid: req.userId },
      { $push: { interests: req.body.interest } },
    );
    if (!data)
      return res.status(404).json({
        message: 'Not Found',
      });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.removeInterest = async (req, res) => {
  try {
    const data = await User.update(
      { uid: req.userId },
      { $pull: { interests: req.body.interest } },
    );
    if (!data)
      return res.status(404).json({
        message: 'Not Found',
      });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
