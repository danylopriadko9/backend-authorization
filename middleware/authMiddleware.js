const jwt = require('jsonwebtoken');
const { secret } = require('../config');
module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      res.status(403).json({
        message: 'Пользователь не авторизован',
      });
    }
    // расшифрорываем информацию из токена, и записываем ее в новое поле 'user' запроса
    req.user = jwt.verify(token, secret);
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: 'Пользователь не авторизован',
    });
  }
};
