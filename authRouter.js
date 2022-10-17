const Route = require('express');
const router = new Route();
const controller = require('./authController');
const { check } = require('express-validator');
const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');

router.post(
  '/registration',
  [
    check('username', 'Имя пользователя должно быть длиннее трех символов')
      .notEmpty()
      .isLength({ min: 3 }),
    check('password', 'Пароль должен быть длиннее пяти символов')
      .notEmpty()
      .isLength({ min: 5 }),
  ],
  controller.registration
);
router.post('/login', controller.login);
router.get('/users', authMiddleware, roleMiddleware, controller.getUsers);

module.exports = router;
