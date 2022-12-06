const controller = require('../controllers/intersetController');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  //   app.post(
  //     '/auth/signup',
  //     [
  //       verifySignUp.checkDuplicateUsernameOrEmail,
  //       verifySignUp.checkRolesExisted,
  //     ],
  //     controller.signup,
  //   );

  app.post('/interest/', controller.createInterest);
  app.get('/interest/', controller.getAllInterest);
};
