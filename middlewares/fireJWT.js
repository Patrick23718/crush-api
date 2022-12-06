// import * as admin from 'firebase-admin';

verifyToken = (req, res, next) => {
  const tokenString = req.headers['authorization'];

  if (tokenString) {
    const { getAuth } = require('firebase-admin/auth');
    getAuth()
      .verifyIdToken(tokenString)
      .then((decodeToken) => {
        console.log(decodeToken);
        req.userId = decodeToken.uid;
        next();
      })
      .catch((error) => {
        console.log(error);
        res.status(401).json({ message: '401' });
      });
  } else {
    res.status(403).json({ message: '403' });
  }
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;
