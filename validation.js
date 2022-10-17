const { body } = require('express-validator');

//создаем валидацию для полей регистрации юзера
const registerValidation = [
  body('password', 'Пароль должен быть минимум 5 символов').isLength({
    min: 5,
  }),
  body('username', 'Укажите имя').isLength({ min: 3 }),
];

module.exports = registerValidation;
