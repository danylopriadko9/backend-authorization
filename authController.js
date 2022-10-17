// импортируем модели юзера и ролей
const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('./config');

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  // возвращаем токен в котором будет зашифрован id roles, шифруем через секрестный ключ из конфига, токен будет жить 24 часа
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

const saltRounds = 7;
// обьеденяем все функции в одну сущность, для простоты работы
class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json(
          {
            message: 'Ошибка валидации',
          },
          errors
        );
      }

      const { username, password } = req.body;
      const candidat = await User.findOne({ username });

      if (candidat) {
        return res.status(400).json({
          message: 'Пользователь с таким именем уже существует',
        });
      }

      const hashPassword = bcrypt.hashSync(password, saltRounds);
      const UserRole = await Role.findOne({ value: 'USER' });
      const user = new User({
        username,
        password: hashPassword,
        roles: [UserRole.value],
      });

      await user.save();
      res.status(200).json({
        message: 'Пользователь создан успешно',
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: 'Не удалось зарегестрировать пользователя',
      });
    }
  }

  async login(req, res) {
    try {
      const { password, username } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({
          message: 'Пользователя с таким именем не существует',
        });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({
          message: 'Пароль неверный',
        });
      }

      const token = generateAccessToken(user._id, user.roles);

      return res.status(200).json({
        message: 'Авторизация прошла успешно',
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: 'Ошибка',
      });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      if (!users) {
        return res.status(200).json({
          message: 'Пользователей не найдено',
        });
      }

      return res.status(200).json({
        message: 'Юзеры',
        users,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: 'Не удалось зарегестрировать пользователя',
      });
    }
  }
}

module.exports = new authController();
