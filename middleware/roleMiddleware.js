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
    const { roles } = jwt.verify(token, secret);

    if (!roles.includes('ADMIN')) {
      res.status(403).json({
        message: 'Нет доступа',
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: 'Пользователь не авторизован',
    });
  }
};
