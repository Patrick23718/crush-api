const controller = require('../controllers/userController');
const { verifyToken } = require('../middlewares/fireJWT');

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

  app.post('/user', verifyToken, controller.createUser);
  app.get('/user', verifyToken, controller.getUser);
  app.put('/user', verifyToken, controller.updateUser);
  app.put('/user/image', verifyToken, controller.addImage);
  app.put('/user/image/remove', verifyToken, controller.removeImage);
  app.put('/user/interest', verifyToken, controller.addInterest);
  app.put('/user/interest/remove', verifyToken, controller.removeInterest);
};
